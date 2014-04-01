(function($){

function cookie(key, value, options) {
    var days, time, result, decode

    // A key and value were given. Set cookie.
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        // Enforce object
        options = $.extend({}, options)

        if (value === null || value === undefined) options.expires = -1

        if (typeof options.expires === 'number') {
            days = (options.expires * 24 * 60 * 60 * 1000)
            time = options.expires = new Date()

            time.setTime(time.getTime() + days)
        }

        value = String(value)

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '',
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''))
    }

    // Key and possibly options given, get cookie
    options = value || {}

    decode = options.raw ? function (s) { return s } : decodeURIComponent

    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null
}

function random_between(lo, hi) {
  return Math.floor((Math.random() * (hi - lo)) + lo);;
}

var N = 10, UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3;

function generate_map() {
  var g = blank_map();
  var a = [
    { x: 0, y: 0, d: LEFT }
  , { x: 3, y: 3, d: UP }
  , { x: 5, y: 0, d: RIGHT }
  ];
  for (var i = 0; i < 3; i++) {
    generate_plane(g, i, a[i]);
  }
  return a;
}

function random_plane(a) {
  a.x = random_between(0, N-1);
  a.y = random_between(0, N-1);
  a.d = random_between(0, 3);
}

function generate_plane(g, i, a) {
  random_plane(a);
  while (!fill_map_with_plane(g, i, a)) {
    random_plane(a);
  }
}

function map_hash(g) {
  return hex_md5(JSON.stringify(g));
}

function get_played() {
  var played = JSON.parse(cookie('played'));
  if (played == null) played = [];
  return played;
}

function set_played(played) {
  cookie('played', JSON.stringify(played));
}

function already_played(h) {
  var played = get_played();
  return $.inArray(h, played) !== -1;
}

function get_histories() {
  var histories = cookie('histories');
  while (histories != null && !(histories instanceof Array)) {
    histories = JSON.parse(histories);
  }
  if (histories == null) histories = [];
  return histories;
}

function set_histories(histories) {
  cookie('histories', JSON.stringify(histories));
}

function generate_unique_map() {
  var g = generate_map(), i = 0;
  while (already_played(map_hash(g)) && i < 100) {
    g = generate_map();
    i++;
  }
  return g;
}

function blank_map() {
  var g = new Array(N);
  for (var i = 0; i < N; i++) {
    g[i] = new Array(N);
    for (var j = 0; j < N; j++) {
      g[i][j] = empty_cell();
    }
  }
  return g;
}

function empty_cell() {
  return { type: 'empty' };
}

function head_cell(k) {
  return { type: 'head', id: k };
}

function body_cell(k) {
  return { type: 'body', id: k };
}

function is_empty_cell(c) {
  return c.type === 'empty';
}

function is_head_cell(c) {
  return c.type === 'head';
}

function is_body_cell(c) {
  return c.type === 'body';
}

function fill_map(g, planes) {
  for (var i = 0; i < planes.length; i++) {
    fill_map_with_plane(g, i, planes[i]);
  }
}

var PLANES = [
  // UP = 0
  ["  o  ",
   "xxxxx",
   "  x  ",
   " xxx "]
  // RIGHT = 1
, ["  x ",
   "x x ",
   "xxxo",
   "x x ",
   "  x "]
  // DOWN = 2
, [" xxx ",
   "  x  ",
   "xxxxx",
   "  o  "]
  // LEFT = 3
, [" x  ",
   " x x",
   "oxxx",
   " x x",
   " x  "]
];

function fill_map_with_plane(g, k, plane) {
  var p = PLANES[plane.d],
      x = plane.x,
      y = plane.y,
      h = p.length,
      w = p[0].length;
  
  if (h+x > N || w+y > N) return false;
  
  for (var i = 0; i < p.length; i++) {
    for (var j = 0; j < p[i].length; j++) {
      if (p[i][j] === 'o' || p[i][j] === 'x') {
        if (!is_empty_cell(g[i+x][j+y])) {
          return false;
        }
      }
    }
  }
  
  for (var i = 0; i < p.length; i++) {
    for (var j = 0; j < p[i].length; j++) {
      if (p[i][j] === 'o') {
        g[i+x][j+y] = head_cell(k);
      }
      if (p[i][j] === 'x') {
        g[i+x][j+y] = body_cell(k);
      }
    }
  }
  return true;
}

function cell_id(i, j) {
  return "cell_" + i + "_" + j;
}

function $cell(i, j) {
  return $('#' + cell_id(i, j));
}

function generate_table(rows, cols) {
  var html = '';
  for (var i = 0; i < rows; i++) {
    html += '<tr>';
    for (var j = 0; j < cols; j++) {
      html += '<td id="' + cell_id(i, j) + '" data-x="' + i + '" data-y="' + j + '"></td>';
    }
    html += '</tr>';
  }
  $('#grid').html(html);
}

function reveal_map(g) {
  for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) {
      reveal_cell(g, i, j);
    }
  }
}

function reveal_cell(g, i, j) {
  if (is_empty_cell(g[i][j])) {
    $cell(i, j).addClass('empty');
  }
  else if (is_head_cell(g[i][j])) {
    $cell(i, j).addClass('head');
  }
  else if (is_body_cell(g[i][j])) {
    $cell(i, j).addClass('body');
  }
  $cell(i, j).addClass('revealed');
}

function update_health_status(u, g, health) {
  var alive_count = 0;
  for (var i = 0; i < health.length; i++) {
    $('.health' + i).hide();
    if (health[i] > 0) {
      $('.alive.health' + i).show();
      alive_count++;
    }
    else {
      $('.dead.health' + i).show();
    }
  }
  $('#revealed-count').text($('.revealed').length);
  if (alive_count === 0) {
    var played = get_played();
    played.push(map_hash(u));
    set_played(played);
    
    var histories = get_histories();
    histories.push({ reveals: $('.revealed').length, ticks: window.tick });
    set_histories(JSON.stringify(histories));
    
    reveal_map(g);
    window.clearInterval(window.ticker);
    
    if (window.confirm('Game over! Play again?')) {
      window.location.reload();
    }
  }
}

function format_tick(t) {
  var s = t % 60,
      m = (t-s) / 60;
  if (s < 10) s = '0' + s;
  return m + ':' + s;
}

function tick() {
  if (window.tick > 0) window.tick++;
  else window.tick = 1;
  $('#tick').text(format_tick(window.tick));
}

function draw_histories() {
  var html = '<div class="row">' +
             '<div class="cell">#</div>' +
             '<div class="cell">Clicks</div>' +
             '<div class="cell">Time</div>' +
             '</div>',
      histories = get_histories();
  console.log(histories);
  for (var i = 1; i <= 5 && i < histories.length; i++) {
    var h = histories[histories.length - i];
    html += '<div class="row"><div class="cell">' +
            (histories.length - i) +
            '</div><div class="cell">' +
            h.reveals +
            '</div><div class="cell">' +
            format_tick(h.ticks) +
            '</div></div>';
  }
  var sumOfReveals = 0, sumOfTicks = 0;
  for (var i in histories) {
    var h = histories[i];
    sumOfReveals += h.reveals;
    sumOfTicks += h.ticks;
  }
  var avgReveals = Math.round(sumOfReveals / histories.length * 100) / 100,
      avgTicks = format_tick(Math.round(sumOfTicks / histories.length));
  if (isNaN(avgReveals)) {
    avgReveals = 'N/A';
    avgTicks = 'N/A';
  }
  html += '<div class="row"><div class="cell">' +
          '(avg)' +
          '</div><div class="cell">' +
          avgReveals +
          '</div><div class="cell">' +
          avgTicks +
          '</div></div>';
  return html;
}

//===
generate_table(N, N);

var u = generate_unique_map();
var g = blank_map();
fill_map(g, u);
// reveal_map(g);

var health = [3, 3, 3];
update_health_status(u, g, health);

$('td').click(function(){
  var x = $(this).data('x'),
      y = $(this).data('y'),
      c = g[x][y];
  
  if ($(this).hasClass('revealed')) return;
  
  if ($(this).hasClass('highlight')) {
    $(this).removeClass('highlight');
  
    if (window.ticker == undefined) {
      window.ticker = window.setInterval(tick, 1000);
    }

    reveal_cell(g, x, y);
  
    if (is_head_cell(c)) {
      health[c.id] = 0;
    }
    else if (is_body_cell(c)) {
      health[c.id]--;
    }
  
    update_health_status(u, g, health);
  }
  else {
    $(this).addClass('highlight');
  }
}).on('contextmenu', function(evt){
  if (!$(this).hasClass('revealed')) {
    $(this).toggleClass('highlight');
  }
  evt.preventDefault();
  return false;
});

$('#radius').change(function(){
  var radius = $('#radius').val();
  $('td').css('border-radius', radius + 'px');
});

$('#histories').html(draw_histories());

})(jQuery);