* [Integrating Programming Languages & Databases: What's the Problem?](http://www.cs.utexas.edu/~wcook/Drafts/2005/PLDBProblem.pdf)
* [StatusQuo](http://db.csail.mit.edu/statusquo/) automatically refactors database applications for performance
  * StatusQuo is made possible by two key technologies: QBS and Pyxis
  * Related [VLDB paper](http://people.csail.mit.edu/akcheung/papers/vldb12.pdf) and [slides](http://people.csail.mit.edu/akcheung/papers/vldb12_slides.pdf) for Pyxis
  * Pyxis uses [Polyglot](http://www.cs.cornell.edu/projects/polyglot/) - a compiler front end framework for building Java language extensions
  * Pyxis only reduces **network latency** by running part of the application code on the DB server
  * No REAL stored procedure is generated
  * Also they state that (in Page 3) "We find that running the program outside the DBMS does not significantly hurt performance as long as it is colocated"
  * But the experiment section only compares (1) JDBC, (2) Manual, (3) Pyxis, where "Manual" is to manually separate Java code
  * Should do experiments on manually translating Java code to SQL stored procedure
  * But they also have another paper [Inferring SQL Queries Using Program Synthesis (arXiv 1208.2013)](http://arxiv.org/abs/1208.2013), which extracts relational specifications from imperative code fragments, and uses the [Sketch](https://bitbucket.org/gatoatigrado/sketch-frontend/wiki/Home) synthesizer to find a provably correct transformation from Java into SQL (this is the QBS (Query By Synthesis) part)