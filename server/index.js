const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const initDB = require("./database/create-db");
// const posts = require("./controllers/posts.js");
const gets = require("./controllers/gets.js");
var sqlite3 = require('sqlite3').verbose();
const DB_PATH = 'server/database/weather.db'
// const cron = require('node-cron');
// const axios = require('axios');

// connect to database
const DB = new sqlite3.Database(DB_PATH, function(err){
  if (err) {
      console.log(err)
      return
  }

  console.log('Connected to ' + DB_PATH + ' database.')

  // create table
  dbSchema = `CREATE TABLE IF NOT EXISTS Bristol (
    id integer NOT NULL PRIMARY KEY,
    Location text,
    Temperature number NOT NULL,
    Feels_Like number,
    Humidity number,
    Wind number,
    Description text,
    Icon text,
    Timestamp integer
  );`

  // // execute schema, throw error if necessary
  DB.exec(dbSchema, function(err){
    if (err) {
      console.log(err)
    }
  });
});

gets.getWeather(DB);

// send data from database to browser
app.get('/', (req, res) => {
  var sql = 'SELECT * '
  sql += 'FROM Bristol '

  DB.all(sql, [], function(error, rows) {
    if (error) {
      console.log(error)
      return
    }

    res.json({"data": rows})
  });
})

// listen on port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})