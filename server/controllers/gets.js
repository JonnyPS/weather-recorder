const axios = require('axios');
const CronJob = require('cron').CronJob;
require('dotenv').config()

module.exports = {
  getWeather: function (database) {
    console.log('getWeather')
    const task = new CronJob('15 14 * * *', () => {
      console.log('Running CRON job now: ');
      axios.get("http://api.openweathermap.org/data/2.5/weather?q=Bristol,GB&units=metric&appid=fe46f64d11af51352d4aea674767e906")
        .then(response => {
          console.log(response)
          console.log("Data retrieved....")
          this.postData(database,
            response.data.name,
            response.data.main.temp,
            response.data.main.feels_like,
            response.data.main.humidity,
            response.data.wind.speed,
            response.data.weather[0].description,
            response.data.weather[0].icon,
            response.data.dt
            
            )
        })
        .catch(error => {
          console.log(error);
        });
    }, true, "Europe/London")
    task.start();
  },
  postData: function (database, name, temp, feels_like, humidity, wind, description, icon, timestamp) {
    console.log('Posting data to Database')
    var sql= "INSERT INTO Bristol (Location, Temperature, Feels_Like, Humidity, Wind, Description, Icon, Timestamp) "
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