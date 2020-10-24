const axios = require('axios');
const CronJob = require('cron').CronJob;
require('dotenv').config()

module.exports = {
  getWeather: function (database) {
    console.log('getWeather')
    const task = new CronJob('00 13 * * *', () => {
      console.log('Running CRON job now: ');
        axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=51.46&lon=-2.6&exclude=minutely,hourly,current&units=metric&appid=fe46f64d11af51352d4aea674767e906")
          .then(response => {
            // console.log(response.data)
            console.log("Data retrieved for Bristol....")
            this.postData(
              database,
              "Bristol",
              response
              )
          })
          .catch(error => {
            console.log(error);
          });
        axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=51.51&lon=-0.13&exclude=minutely,hourly,current&units=metric&appid=fe46f64d11af51352d4aea674767e906")
        .then(response => {
          // console.log(response)
          console.log("Data retrieved for London....")
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

    let location = tableName;
    let sunrise = response.data.daily[0].sunrise;
    let sunset = response.data.daily[0].sunset;
    let dayTemp = response.data.daily[0].temp.day;
    let minTemp = response.data.daily[0].temp.min;
    let maxTemp = response.data.daily[0].temp.max;
    let nightTemp = response.data.daily[0].temp.night;
    let eveTemp = response.data.daily[0].temp.eve;
    let mornTemp = response.data.daily[0].temp.morn;
    
    let feelsLike_day = response.data.daily[0].feels_like.day;
    let feelsLike_night = response.data.daily[0].feels_like.night;
    let feelsLike_eve = response.data.daily[0].feels_like.eve;
    let feelsLike_morn = response.data.daily[0].feels_like.morn;

    let humidity = response.data.daily[0].humidity;
    let wind = response.data.daily[0].wind_speed;
    let windDir = response.data.daily[0].wind_deg;
    let main = response.data.daily[0].weather[0].main;
    let description = response.data.daily[0].weather[0].description;
    let icon = response.data.daily[0].weather[0].icon;
    let cloudCover = response.data.daily[0].clouds;
    let pop = response.data.daily[0].pop; // probability of precipitation
    let rain = response.data.daily[0].rain;
    let uvi = response.data.daily[0].uvi;
    let snow = response.data.daily[0].snow;
    let timestamp = response.data.daily[0].dt;


    // console.log("location ", typeof location )
    // console.log("sunrise ", typeof sunrise )
    // console.log("sunset ", typeof sunset )
    // console.log("dayTemp ", typeof dayTemp )
    // console.log("minTemp ", typeof minTemp )
    // console.log("maxTemp ", typeof maxTemp )
    // console.log("nightTemp ", typeof nightTemp )
    // console.log("eveTemp ", typeof eveTemp )
    // console.log("mornTemp ", typeof mornTemp )
    // console.log("feelsLike_day ", typeof feelsLike_day )
    // console.log("feelsLike_night ", typeof feelsLike_night )
    // console.log("feelsLike_eve ", typeof feelsLike_eve )
    // console.log("feelsLike_morn ", typeof feelsLike_morn )

    // console.log("humidity ", typeof humidity )
    // console.log("wind ", typeof wind )
    // console.log("windDir ", typeof windDir )
    // console.log("main ", typeof main )
    // console.log("description ", typeof description )
    // console.log("icon ", typeof icon )
    // console.log("cloudCover ", typeof cloudCover )
    // console.log("pop ", typeof pop )
    // console.log("rain ", typeof rain )
    // console.log("uvi ", typeof uvi )
    // console.log("timestamp ", typeof timestamp )

    var sql= "INSERT INTO " + tableName + "(Location, Sunrise, Sunset, DayTemp, MinTemp, MaxTemp, NightTemp, EveTemp, MornTemp, Feels_Like_Day, Feels_Like_Night, Feels_Like_Eve, Feels_Like_Morn, Humidity, WindSpeed, WindDeg, Weather_Main, Weather_Description, Weather_Icon, Clouds, Pop, Rain, UVI, Snow, Timestamp) "
    sql += "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) "
    database.run(sql, [
      location, 
      sunrise, 
      sunset, 
      dayTemp, 
      minTemp, 
      maxTemp, 
      nightTemp, 
      eveTemp, 
      mornTemp, 
      feelsLike_day, 
      feelsLike_night, 
      feelsLike_eve, 
      feelsLike_morn, 
      humidity, 
      wind, 
      windDir, 
      main, 
      description, 
      icon, 
      cloudCover, 
      pop, 
      rain, 
      uvi, 
      snow, 
      timestamp], function(error) {
        if (error) {
            console.log(error)
        } else {
            console.log("Latest Changes: ", this)
        }
    });
  }
}