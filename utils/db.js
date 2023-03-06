// const MongoClient = require('mongodb').MongoClient;

import { MongoClient } from 'mongodb';

class DBClient {
	constructor() {
		const {
			DB_HOST = "127.0.0.1",
			DB_PORT = 27017,
			DB_DATABASE = "files_manager"
		} = process.env;

		const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

		this.client = MongoClient(url, {
			useUnifiedTopology: true,
			useNewUrlParser: true
			// family: 4
		});

		this.client.connect().catch((error) => {
			console.error("Error occurred while connecting to MongoDB:", error);
		});

		this.db = this.client.db(DB_DATABASE);
	}

	async isAlive() {
		return (
			!!this.client &&
			!!this.client.topology &&
			this.client.topology.isConnected()
		);
		// return this.client.isConnected();
	}

	async nbUsers() {
		const users = this.db.collection("users");
		const countUsers = await users.countDocuments();
		return countUsers;
	}

	async nbFiles() {
		const files = this.db.collection("files");
		const countFiles = await files.countDocuments();
		return countFiles;
	}

	async connect() {
		try {
			await this.client.connect();
			console.log("Connected to MongoDB");
			this.db = this.client.db(DB_DATABASE);
		} catch (err) {
			console.log(err);
			throw new Error("Error connecting to MongoDB");
		}
	}

	async getCollection(collectionName) {
		if (!this.client.isConnected()) {
			await this.client.connect();
		}
		return this.client.db().collection(collectionName);
	}

	async disconnect() {
		if (this.client.isConnected()) {
			await this.client.close();
			console.log("Disconnected from MongoDB");
		}
	}

	//   connect() {
	//     return this.client.connect();
	//   }
	//   disconnect() {
	//     return this.client.disconnect();
	//   }
	//   query() {
	//     return this.client.query();
	//   }
}



const dbClient = new DBClient();
module.exports = dbClient;
