// const MongoClient = require('mongodb').MongoClient;

import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';

class DBClient {
  constructor() {
    this.client = new MongoClient(`mongodb://${DB_HOST}:${DB_PORT}`, { useUnifiedTopology: true, useNewUrlParser: true });
    this.client.connect().then(() => {
      this.db = this.client.db(DB_DATABASE);
    }).catch((error) => {
      console.error(error);
    });
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const users = this.db.collection('users');
    const countUsers = await users.countDocuments();
    return countUsers;
  }

  async nbFiles() {
    const files = this.db.collection('files');
    const countFiles = await files.countDocuments();
    return countFiles;
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
export default dbClient;
