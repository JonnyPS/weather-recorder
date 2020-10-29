const { Client } = require('pg');

// module.exports = {
// 	setupClient: function () {
// 		  client = new Client({
// 			user: 'kqxmgsqidsoufa',
// 			host: 'ec2-54-156-53-71.compute-1.amazonaws.com',
// 			database: 'desr1fih4mehfr',
// 			password: '414b00bf5ee9846341d29fe0ef8e492dc4353a76af333b401d78f9f88a361ec6',
// 			port: 5432,
// 		});
// 		return client;
// 	}
// }

module.exports = {
	setupClient: function () {
		client = new Client({
				user: 'postgres',
				host: 'localhost',
				database: 'weatherrecorder5',
				password: '1234abcd',
				port: 5432,
			});
		return client;
	}
}