import redis from 'redis';


class RedisClient {
	constructor() {
		this.client = redis.createClient();
		this.client.on("error", (err) =>
			console.error("Error occurred while connecting to Redis:", err)
		);
		this.client.connect
	}

	isAlive () {
		
		//return this.client && this.client.isReady === "ready";
		return this.client.connected;
		
	}

	async get (key) {
		return new Promise((resolve, reject) => {
			this.client.get(key, (err, value) => {
				if (err) {
					reject(err);

				} else {
					resolve(value);
				}
			});
		});
	}

	async set (key, value, duration) {
		return new Promise((resolve, reject) => {
			this.client.set(key, value, 'EX', duration, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve()
				}
			});
		})
	}

	async del (key) {
		return new Promise((resolve, reject) => {
			this.client.del(key, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		})
	}
}
const redisclient = new RedisClient();
module.exports = redisclient;