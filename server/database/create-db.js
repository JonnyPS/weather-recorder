
// var sqlite3 = require('sqlite3').verbose();
// const DB_PATH = 'server/database/test.db'

module.exports = {
  createDB: function () {
    
console.log('asfad')
    // // set up schema to create table with cols
    dbSchema = `CREATE TABLE IF NOT EXISTS Users (
      id integer NOT NULL PRIMARY KEY,
      Temperature number NOT NULL,
      Location text
    );`

    // // execute schema, throw error if necessary
    DB.exec(dbSchema, function(err){
      if (err) {
        console.log(err)
      }
    });
  }
}
