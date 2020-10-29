const { Client } = require('pg');
const clientconfig = require('./config.js');

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
				Pop INT,
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
				Pop INT,
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
				process.exit()
					if ( !err ) {
						// this.createColumns();
					}
			});
	}
	// createColumns: function () {
	// 	console.log('insert into table')
	// 	const query2 = `
	// 	INSERT INTO users (email, firstName, lastName, age)
	// 	VALUES ('johndoe@gmail.com', 'john', 'doe', 21)
	// 	`;
	// 	client.query(query2)
	// 	.then(res => {
	// 		console.log('inserted into table')
	// 	})
	// 	.catch(err => {
	// 			console.error(err);
	// 			console.log('insert error');
	// 			client.end();
	// 	})
	// 	.finally(() => {
	// 			client.end();
	// 	});
	// }
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






