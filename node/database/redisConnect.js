const { createClient } = require('redis');
const promiseAwaitMs = require('../functions/utils/promiseAwaitMs');
class Redis {
	// private connected: boolean;
	// private client: RedisClientType;

	constructor() {
		this.client = createClient({ url: 'redis://redis:6379' });
		this.client.connect(); // connect to redis
		this.connected = false;

		// initialization functions
		this.checkConnect();
	}

	// check for connect
	// private checkConnect () {
	checkConnect() {
		this.client.on('connect', () => {
			this.connected = true;
			console.log('Connected to Redis...');
		});

		this.client?.on('error', async err => {
			this.connected = false;
			console.log('Redis error:', err);

			await promiseAwaitMs(1000); // wait for 1 sec
			console.log(`Retrying...`);
			this.client.connect(); // connect again
		});
	}

	// function to wait for connection
	// private async waitForConnection () {
	async waitForConnection() {
		while (true) {
			if (this.connected) break;
			// console.log("Waiting to connect...")
			await promiseAwaitMs(100);
		}
	}

	// set a key value pair
	/**
	 *
	 * @param {string} key
	 * @param {string} value
	 * @returns
	 */
	async set(key, value) {
		await this.waitForConnection(); // wait for connection to be established
		let success = false;
		try {
			// const setAsync = promisify(this.client.set).bind(this.client);
			// await setAsync(key, value);
			await this.client.set(key, value);
			success = true;
		} catch (error) {
			console.log(`An error has occurred while setting a key value pair in redis. Error -> `, error);
			success = false;
		} finally {
			return success;
		}
	}

	// set key value pair with expiry time
	/**
	 *
	 * @param {string} key
	 * @param {string} value
	 * @param {number} expiry_time_secs
	 * @returns
	 */
	async setEx(key, value, expiry_time_secs) {
		await this.waitForConnection(); // wait for connection to be established
		let success = false;
		try {
			// const setAsync = promisify(this.client.setEx()).bind(this.client);
			// await setAsync(key, expiry_time_secs, value);
			await this.client.setEx(key, expiry_time_secs, value);
			success = true;
		} catch (error) {
			success = false;
			console.log(`An error has occurred while setting a key value pair in redis with expiry. Error -> `, error);
		} finally {
			return success;
		}
	}

	// get a key value pair
	/**
	 *
	 * @param {string} key
	 * @returns
	 */
	async get(key) {
		await this.waitForConnection(); // wait for connection to be established
		/** @type {string} */
		let result = '';
		try {
			// const getAsync = promisify(this.client.get()).bind(this.client);
			// result = await getAsync(key);
			result = (await this.client.get(key)) || '';
		} catch (error) {
			console.log(`An error has occurred while getting a value from redis for key -> ${key} Error -> `, error);
		} finally {
			return result;
		}
	}
}

const redisConnect = new Redis();

module.exports = redisConnect;
