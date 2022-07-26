class Measurement {
    #data = [];

    /**
     * Pushes a new measurement to the data array.
     *
     * @private
     * @param {Number} from
     */
    _push(from) {
        // Store the difference between the start and end time
        this.#data.push(process.hrtime()[1] - from);
    }

    /**
     * Begins recording a time cost measurement.
     * Note! You must `execute` the returned function to `finish` recording the measurement.
     *
     * @returns {function():void}
     */
    record() {
        // Store the start time
        const start = process.hrtime()[1];

        // Return a callback function that will push the measurement to the data array once completed
        return () => this._push(start);
    }

    /**
     * Returns all of the recorded measurements.
     * @returns {Number[]}
     */
    get data() {
        return this.#data;
    }

    /**
     * @typedef {Object} Statistics
     * @property {Number} min
     * @property {Number} max
     * @property {BigInt} sum
     * @property {Number} average
     */

    /**
     * Returns the statistics of the recorded measurements.
     * Note! All measurements are returned in `nanoseconds`.
     * @returns {Statistics}
     */
    get statistics() {
        // Initialize the individual statistics
        let average = 0;
        let sum = BigInt(0);
        let min = Number.MAX_SAFE_INTEGER;
        let max = Number.MIN_SAFE_INTEGER;

        // Iterate over all of the measurements
        for (const measurement of this.#data) {
            // Do not consider measurements that are less than 0ns (invalid)
            if (measurement >= 0) {
                // Update the sum
                sum += BigInt(measurement);

                // Update the min and max
                min = Math.min(min, measurement);
                max = Math.max(max, measurement);
            }
        }

        // Calculate the average
        average = Number(sum / BigInt(this.#data.length));

        // Return the statistics object
        return {
            min,
            max,
            sum,
            count: this.#data.length,
            average,
        };
    }
}

module.exports = Measurement;
