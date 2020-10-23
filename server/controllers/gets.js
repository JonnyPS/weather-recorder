const axios = require('axios');
const CronJob = require('cron').CronJob;
require('dotenv').config()

module.exports = {
  getWeather: function (database) {
    console.log('getWeather')
    const task = new CronJob('12 21 * * *', () => {
      console.log('Running CRON job now: ');
        axios.get("http://api.openweathermap.org/data/2.5/weather?q=Bristol,GB&units=metric&appid=fe46f64d11af51352d4aea674767e906")
          .then(response => {
            console.log(response)
            console.log("Data retrieved....")
            this.postData(
              database,
              "Bristol",
              response
              )
          })
          .catch(error => {
            console.log(error);
          });
        axios.get("http://api.openweathermap.org/data/2.5/weather?q=London,GB&units=metric&appid=fe46f64d11af51352d4aea674767e906")
        .then(response => {
          console.log(response)
          console.log("Data retrieved....")
          this.postData(
            database,
            "London",
            response
            )
        })
        .catch(error => {
          console.log(error);
        });    
    }, true, "Europe/London")
  task.start();
  },
  postData: function (database, tableName, response) {
    console.log('Posting data to Database')
    let name = response.data.name;
    let temp = response.data.main.temp;
    let feels_like = response.data.main.feels_like;
    let humidity = response.data.main.humidity;
    let wind = response.data.wind.speed;
    let description = response.data.weather[0].description;
    let icon = response.data.weather[0].icon;
    let timestamp = response.data.dt;

    var sql= "INSERT INTO " + tableName + "(Location, Temperature, Feels_Like, Humidity, Wind, Description, Icon, Timestamp) "
    sql += "VALUES (? ,?, ?, ?, ?, ?, ?, ? ) "
    database.run(sql, [name, temp,  feels_like, humidity, wind, description, icon, timestamp], function(error) {
        if (error) {
            console.log(error)
        } else {
            console.log("Latest Changes: ", this)
        }
    });
  }
}