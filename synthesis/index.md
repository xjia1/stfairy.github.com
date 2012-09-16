* [Integrating Programming Languages & Databases: What's the Problem?](http://www.cs.utexas.edu/~wcook/Drafts/2005/PLDBProblem.pdf)
* [StatusQuo](http://db.csail.mit.edu/statusquo/) automatically refactors database applications for performance
  * Related [paper](http://people.csail.mit.edu/akcheung/papers/vldb12.pdf) and [slides](http://people.csail.mit.edu/akcheung/papers/vldb12_slides.pdf)
  * [Polyglot](http://www.cs.cornell.edu/projects/polyglot/) - A compiler front end framework for building Java language extensions
  * Pyxis only reduces **network latency** by running part of the application code on the DB server
  * No REAL stored procedure is generated
  * Also they state that (in Page 3) "We find that running the program outside the DBMS does not significantly hurt performance as long as it is colocated"
  * But the experiment section only compares (1) JDBC, (2) Manual, (3) Pyxis, where "Manual" is to manually separate Java code
  * Should do experiments on manually translating Java code to SQL stored procedure