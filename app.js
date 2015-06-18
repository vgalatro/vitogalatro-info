var cluster = require('cluster');

if (cluster.isMaster) {

  /* Include os library and count CPUs */
  var os = require('os');
  var cpus = os.cpus().length;

  /* Create workers based on CPU count */
  for (var i = 0; i < cpus; i++) {
    cluster.fork();
  }

  /* Replace workers that fall in the line of duty */
  cluster.on('exit', function (worker) {
    cluster.fork();
  });

} else {

  /* Start app */
  var vgi = require('./vgi.js'),
      db = require("./db.js");
  vgi.runApp(db);
}