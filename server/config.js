const { Client } = require('pg');

// module.exports = {
// 	setupClient: function () {
// 		  client = new Client({
// 			user: 'jjmmmnuscdxcte',
// 			host: 'ec2-3-208-224-152.compute-1.amazonaws.com',
// 			database: 'dfs9na95um01n9',
// 			password: '3a4373ed7b8154056ffdf78c6724d36aeeeaed381cbb8204e87cf7cb01ed8ad5',
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
				database: 'weatherrecorder6',
				password: '1234abcd',
				port: 5432,
			});
		return client;
	}
}