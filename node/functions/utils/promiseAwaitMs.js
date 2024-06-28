/**
 *
 * @param {number} ms
 * @returns
 */
function promiseAwaitMs(ms) {
	return new Promise(res => setTimeout(() => res(true), ms));
}
module.exports = promiseAwaitMs;
