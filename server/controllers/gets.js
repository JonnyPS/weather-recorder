// const posts = require("./posts.js")
const axios = require('axios');
const cron = require('node-cron');

module.exports = {
  getWeather: function (database) {
    console.log('getWeather')
    const task = cron.schedule('* * * * *', () => {
      console.log('Running CRON job now: ');
      axios.get("http://api.openweathermap.org/data/2.5/weather?q=Bristol,GB&units=metric&appid=bd1a8fb5e34d3a26776fd33b4a57ff1b")
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
    })
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