const axios = require('axios');
const clientconfig = require('../config.js');

const CronJob = require('cron').CronJob;
require('dotenv').config()
const client = require('../config.js');

module.exports = {
  getWeather: function (client, database) {
    console.log('getWeather')
    const task = new CronJob('30 09 * * *', () => {
      console.log('Running CRON job now: ');
        axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=51.46&lon=-2.6&exclude=minutely,hourly,current&units=metric&appid=fe46f64d11af51352d4aea674767e906")
          .then(response => {
            // console.log(response.data)
            console.log("Data retrieved for Bristol....")
            this.postData(
							client,
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
						client,
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
  postData: function (client, database, tableName, response) {
		console.log('Posting data to Database')
		// console.log('response = ', response.data)
		
		// const client = new Client({
		// 	user: 'postgres',
		// 	host: 'localhost',
		// 	database: 'weatherrecorder5',
		// 	password: '1234abcd',
		// 	port: 5432,
		// });

		// console.log('what is client: ', client)

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

		console.log('connected to ' + client.database)
		const text = `INSERT INTO ${ tableName } (location, sunrise, Sunset, DayTemp, MinTemp, MaxTemp, NightTemp, EveTemp, MornTemp, Feels_Like_Day, Feels_Like_Night, Feels_Like_Eve, Feels_Like_Morn, Humidity, WindSpeed, WindDeg, Weather_Main, Weather_Description, Weather_Icon, Clouds, Pop, Rain, UVI, Snow, Timestamp) 
		VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25) RETURNING *`
		const values = [location, sunrise, sunset, dayTemp, minTemp, maxTemp, nightTemp, eveTemp, mornTemp, feelsLike_day, feelsLike_night, feelsLike_eve, feelsLike_morn, humidity, wind, windDir, main, description, icon, cloudCover, pop, rain, uvi, snow, timestamp]

		client.query(text, values)
			.then(res => {
				console.log('Success! \nPosted to table: ', tableName )
			})
			.catch(e => console.error(e.stack))
	}
}	
