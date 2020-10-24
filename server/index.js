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

  // create table for Bristol
  dbSchemaBristol = `CREATE TABLE IF NOT EXISTS Bristol (
    id integer NOT NULL PRIMARY KEY,
    Location text,
    Sunrise number,
    Sunset number,
    DayTemp number,
    MinTemp number,
    MaxTemp number,
    NightTemp number,
    EveTemp number,
    MornTemp number,
    Feels_Like_Day number,
    Feels_Like_Night number,
    Feels_Like_Eve number,
    Feels_Like_Morn number,
    Humidity number,
    WindSpeed number,
    WindDeg number,
    Weather_Main text,
    Weather_Description text,
    Weather_Icon text,
    Clouds number,
    Pop number,
    Rain number,
    UVI number,
    Snow number,
    Timestamp integer
  );`

  // create table for London
  dbSchemaLondon = `CREATE TABLE IF NOT EXISTS London (
    id integer NOT NULL PRIMARY KEY,
    Location text,
    Sunrise number,
    Sunset number,
    DayTemp number,
    MinTemp number,
    MaxTemp number,
    NightTemp number,
    EveTemp number,
    MornTemp number,
    Feels_Like_Day number,
    Feels_Like_Night number,
    Feels_Like_Eve number,
    Feels_Like_Morn number,
    Humidity number,
    WindSpeed number,
    WindDeg number,
    Weather_Main text,
    Weather_Description text,
    Weather_Icon text,
    Clouds number,
    Pop number,
    Rain number,
    UVI number,
    Snow number,
    Timestamp integer
  );`

  let tables = [dbSchemaBristol, dbSchemaLondon];

  // execute schema for each table, throw error if necessary
  // tables.forEach( (item) => {
    DB.exec(dbSchemaBristol, function(err){
      if (err) {
        console.log(err)
      }
    });
    DB.exec(dbSchemaLondon, function(err){
      if (err) {
        console.log(err)
      }
    });  
  // })
});

gets.getWeather(DB);

// send data from database to browser
app.get('/', (req, res) => {
  var sql = 'SELECT * '
  sql += 'FROM Bristol ';
  var sql2 = 'SELECT * '
  sql2 += 'FROM London '

  DB.all(sql, [], function(error, rows) {
    if (error) {
      console.log(error)
      return
    }
    console.log('selecting from Bristol.....')
    getNextTable(rows);

    // res.json({"data": rows})
  });

  function getNextTable(prevTable) {
    DB.all(sql2, [], function(error, rows) {
      if (error) {
        console.log(error)
        return
      }
      console.log('selecting from London.....')
      
      res.json({
        "data": [
          {"Bristol": prevTable},
          {"London": rows}
        ]
      })  

      // res.json({"data": rows})
    });
  }


})

// listen on port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})