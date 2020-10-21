// this file is called from index.js
// it first checks if a table exists using setupDB()
// if table it does not exist, it creates one through the createDB()

module.exports = {
  setupDB: function () {
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('server/database/test3.db');
    db.serialize(function() {
      db.get("SELECT rowid FROM testTable", function(error, row) {
        if (row !== undefined) {
          console.log("table exists...");
        } else {
          console.log("Table does not exist, creating table now...");
          createDB();
        }
      })
    })
  }
}

function createDB() {
  var sqlite3 = require('sqlite3').verbose();
  var db = new sqlite3.Database('server/database/test3.db');

  db.serialize(function() {
    db.run("CREATE TABLE testTable (info TEXT)");

    var stmt = db.prepare("INSERT INTO testTable VALUES (?)");
    for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid, info FROM testTable", function(err, row) {
      console.log(row.rowid + ": " + row.info);
    });
  });

  db.close();
}