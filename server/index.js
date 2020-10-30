const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const gets = require("./controllers/gets.js");
const clientconfig = require('./config.js');


// set up DB tables
const init = {
	connectDB: function () {
		client.connect(err => {
			if (err) {
				console.error('connection error', err.stack)
				console.log('DB error');
				client.end();
			} else {
				console.log('connected to ' + client.database)
				this.createFirstTable();
			}
		});
	},
	createFirstTable: function () {
		const bristolDBschema = `
			CREATE TABLE IF NOT EXISTS Bristol (
				id INT GENERATED ALWAYS AS IDENTITY,
				Location text, 
				Sunrise INT,
				Sunset INT,
				DayTemp NUMERIC,
				MinTemp NUMERIC,
				MaxTemp NUMERIC,
				NightTemp NUMERIC,
				EveTemp NUMERIC,
				MornTemp NUMERIC,
				Feels_Like_Day NUMERIC,
				Feels_Like_Night NUMERIC,
				Feels_Like_Eve NUMERIC,
				Feels_Like_Morn NUMERIC,
				Humidity NUMERIC,
				WindSpeed NUMERIC,
				WindDeg NUMERIC,
				Weather_Main TEXT,
				Weather_Description TEXT,
				Weather_Icon TEXT,
				Clouds NUMERIC,
				Pop NUMERIC,
				Rain NUMERIC,
				UVI NUMERIC,
				Snow NUMERIC,
				Timestamp INT
			)`;
		client.query(bristolDBschema)
			.then(res => {
					console.log('Table for Bristol is successfully created');
			})
			.catch(err => {
					console.error(err);
					console.log('Table error');
					client.end();
			})
			.finally((err) => {
					if ( !err ) {
						// this.createColumns();
						this.createSecondTable();
					}
			});
		},
		createSecondTable: function () {
			const londonDBschema = `
			CREATE TABLE IF NOT EXISTS London (
				id INT GENERATED ALWAYS AS IDENTITY,
				Location text, 
				Sunrise INT,
				Sunset INT,
				DayTemp NUMERIC,
				MinTemp NUMERIC,
				MaxTemp NUMERIC,
				NightTemp NUMERIC,
				EveTemp NUMERIC,
				MornTemp NUMERIC,
				Feels_Like_Day NUMERIC,
				Feels_Like_Night NUMERIC,
				Feels_Like_Eve NUMERIC,
				Feels_Like_Morn NUMERIC,
				Humidity NUMERIC,
				WindSpeed NUMERIC,
				WindDeg NUMERIC,
				Weather_Main TEXT,
				Weather_Description TEXT,
				Weather_Icon TEXT,
				Clouds NUMERIC,
				Pop NUMERIC,
				Rain NUMERIC,
				UVI NUMERIC,
				Snow NUMERIC,
				Timestamp INT
			)`;
		client.query(londonDBschema)
			.then(res => {
					console.log('Table for London is successfully created');
			})
			.catch(err => {
					console.error(err);
					console.log('Table error');
					client.end();
			})
			.finally((err) => {
				console.log('exit process.... tables have been made')
				gets.getWeather(client, client.database)
				
			});
	}
}


async function setup() {
	clientconfig.setupClient();
}
setup()
	.then(
		init.connectDB(client)
	)
	.then(
		console.log(client)
	)
	// .then(connectToDatabase())

// function connectToDatabase() {
// 	console.log('connectToDatabase')
	
// 	client.connect(err => {
// 		if (err) {
// 			console.error('connection error', err.stack)
// 			console.log('DB error');
// 			client.end();
// 		} else {
// 			console.log('connected to ' + client.database)
// 		}
// 	});
// }

// app.get('/', (req, res) => {
// 	console.log('getting....')
// 	const query = `SELECT * from Bristol`;
// 	client.query(query, (err, resp) => {
//     if (err) {
// 			console.error(err);
// 			return;
//     }
// 		console.log('anyone?')
// 		res.json({data: resp.rows})
// 			// console.log(resp);
		
//     // client.end();
// 	});
// })

app.get('/', (req, res) => {
  var query = 'SELECT * from Bristol ';	
	client.query(query, (err, resp) => {
		if (err) {
			console.error(err);
			return;
		}
		console.log('selecting from Bristol.....')
    getNextTable(resp.rows);
	});

  function getNextTable(prevTable) {
		var query2 = 'SELECT * from London ';
    client.query(query2, (err, resp) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log('selecting from London.....')
			res.json({
        "data": [
          {"Bristol": prevTable},
          {"London": resp.rows}
        ]
      })  
		});
	}
});







// initDB.connectDB(client);
// if ( client === undefined ) {
// 	console.log('setup before serving....')
// 	initDB.connectDB();
// } else {
// 	console.log('serve....')
// }


// function get() {
	// app.get('/', (req, res) => {
		// console.log('res', res)
		// const query3 = `
		// SELECT *
		// FROM users
		// `;
		// client.query(query3, (err, res) => {
		// 	if (err) {
		// 		console.error(err);
		// 		return;
		// 	}
		// 	for (let row of res.rows) {
		// 		console.log(row);
		// 	}
		// 	client.end();
		// });
// }
// get();

// app.get('/', (req, res) => {
// 	console.log('hello world')
// })





// listen on port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})





// connect to database
// const DB = new sqlite3.Database(DB_PATH, function(err){
//   if (err) {
//       console.log(err)
//       return
//   }

//   console.log('Connected to ' + DB_PATH + ' database.')

//   // create table for Bristol
//   dbSchemaBristol = `CREATE TABLE IF NOT EXISTS Bristol (
//     id integer NOT NULL PRIMARY KEY,
//     Location text,
//     Sunrise number,
//     Sunset number,
//     DayTemp number,
//     MinTemp number,
//     MaxTemp number,
//     NightTemp number,
//     EveTemp number,
//     MornTemp number,
//     Feels_Like_Day number,
//     Feels_Like_Night number,
//     Feels_Like_Eve number,
//     Feels_Like_Morn number,
//     Humidity number,
//     WindSpeed number,
//     WindDeg number,
//     Weather_Main text,
//     Weather_Description text,
//     Weather_Icon text,
//     Clouds number,
//     Pop number,
//     Rain number,
//     UVI number,
//     Snow number,
//     Timestamp integer
//   );`

//   // create table for London
//   dbSchemaLondon = `CREATE TABLE IF NOT EXISTS London (
//     id integer NOT NULL PRIMARY KEY,
//     Location text,
//     Sunrise number,
//     Sunset number,
//     DayTemp number,
//     MinTemp number,
//     MaxTemp number,
//     NightTemp number,
//     EveTemp number,
//     MornTemp number,
//     Feels_Like_Day number,
//     Feels_Like_Night number,
//     Feels_Like_Eve number,
//     Feels_Like_Morn number,
//     Humidity number,
//     WindSpeed number,
//     WindDeg number,
//     Weather_Main text,
//     Weather_Description text,
//     Weather_Icon text,
//     Clouds number,
//     Pop number,
//     Rain number,
//     UVI number,
//     Snow number,
//     Timestamp integer
//   );`

//   let tables = [dbSchemaBristol, dbSchemaLondon];

//   // execute schema for each table, throw error if necessary
//   // tables.forEach( (item) => {
//     DB.exec(dbSchemaBristol, function(err){
//       if (err) {
//         console.log(err)
//       }
//     });
//     DB.exec(dbSchemaLondon, function(err){
//       if (err) {
//         console.log(err)
//       }
//     });  
//   // })
// });

// gets.getWeather(DB);

// // send data from database to browser
// app.get('/', (req, res) => {
//   var sql = 'SELECT * '
//   sql += 'FROM Bristol ';
//   var sql2 = 'SELECT * '
//   sql2 += 'FROM London '

//   DB.all(sql, [], function(error, rows) {
//     if (error) {
//       console.log(error)
//       return
//     }
//     console.log('selecting from Bristol.....')
//     getNextTable(rows);

//     // res.json({"data": rows})
//   });

//   function getNextTable(prevTable) {
//     DB.all(sql2, [], function(error, rows) {
//       if (error) {
//         console.log(error)
//         return
//       }
//       console.log('selecting from London.....')
      
//       res.json({
//         "data": [
//           {"Bristol": prevTable},
//           {"London": rows}
//         ]
//       })  

//       // res.json({"data": rows})
//     });
//   }


// })

// // listen on port
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })