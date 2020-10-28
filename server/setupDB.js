const { Client } = require('pg');
const client = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'testing13',
	password: '1234abcd',
	port: 5432,
});

const init = {
	connectDB: function () {
		client.connect(err => {
			if (err) {
				console.error('connection error', err.stack)
				console.log('DB error');
				client.end();
			} else {
				console.log('connected to ' + client.database)
				this.createTable();
			}
		});
	},
	createTable: function () {
		const query = `
		CREATE TABLE users (
				email varchar,
				firstName varchar,
				lastName varchar,
				age int
		);
		`;
		client.query(query)
			.then(res => {
					console.log('Table is successfully created');
			})
			.catch(err => {
					console.error(err);
					console.log('Table error');
					client.end();
			})
			.finally((err) => {
					if ( !err ) {
						this.createColumns();
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


init.connectDB();




