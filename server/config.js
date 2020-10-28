const { Client } = require('pg');

module.exports.client = new Client({
		user: 'postgres',
		host: 'localhost',
		database: 'testing12',
		password: '1234abcd',
		port: 5432,
	});