const express = require('express')
const app = express()
const port = 8080;
// const initDB = require("./database/create-db");
// console.log( initDB.setupDB())
var sqlite3 = require('sqlite3').verbose();
const DB_PATH = 'server/database/test.db'

const DB = new sqlite3.Database(DB_PATH, function(err){
  if (err) {
      console.log(err)
      return
  }
  console.log('Connected to ' + DB_PATH + ' database.')
});

dbSchema = `CREATE TABLE IF NOT EXISTS Users (
  id integer NOT NULL PRIMARY KEY,
  login text NOT NULL UNIQUE,
  password text NOT NULL,
  email text NOT NULL UNIQUE,
  first_name text,
  last_name text
);`

DB.exec(dbSchema, function(err){
if (err) {
  console.log(err)
}
});


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })
