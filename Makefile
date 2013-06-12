JEMDOC=./jemdoc.py
COMMON=MENU

all: \
	index.html resume.html contact.html \
	pubs.html deadlines.html teaching.html \
	ug.html \
	people.html howto.html erlang.html nintendo.html \
	compiler.html articles.html books.html courses.html \
	tools.html misc.html

index.html: index.jemdoc $(COMMON)
	$(JEMDOC) index

resume.html: resume.jemdoc $(COMMON)
	$(JEMDOC) resume

contact.html: contact.jemdoc $(COMMON)
	$(JEMDOC) contact

pubs.html: pubs.jemdoc $(COMMON)
	$(JEMDOC) pubs

deadlines.html: deadlines.jemdoc $(COMMON)
	$(JEMDOC) deadlines

teaching.html: teaching.jemdoc $(COMMON)
	$(JEMDOC) teaching

ug.html: ug.jemdoc $(COMMON)
	$(JEMDOC) ug

people.html: people.jemdoc $(COMMON)
	$(JEMDOC) people

howto.html: howto.jemdoc $(COMMON)
	$(JEMDOC) howto

erlang.html: erlang.jemdoc $(COMMON)
	$(JEMDOC) erlang

nintendo.html: nintendo.jemdoc $(COMMON)
	$(JEMDOC) nintendo

compiler.html: compiler.jemdoc $(COMMON)
	$(JEMDOC) compiler

articles.html: articles.jemdoc $(COMMON)
	$(JEMDOC) articles

books.html: books.jemdoc $(COMMON)
	$(JEMDOC) books

courses.html: courses.jemdoc $(COMMON)
	$(JEMDOC) courses

tools.html: tools.jemdoc $(COMMON)
	$(JEMDOC) tools

misc.html: misc.jemdoc $(COMMON)
	$(JEMDOC) misc
