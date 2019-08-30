const _ = require('lodash');
const moment = require('moment');

class Utils {

  constructor(number) {

    this.number = number;

  }

  /* This function will return the square of the number that the constructor of this class receives.*/

  isPast = (timestamp) => {
    if (timestamp) {
      const { seconds } = timestamp;
      const m = moment.unix(seconds)
      const now = moment();
      return m.isBefore(now);
    }
  };

  isFuture = (timestamp) => {
    if (timestamp) {
      const { seconds } = timestamp;
      const m = moment.unix(seconds)
      const now = moment();
      return m.isAfter(now);
    }
  };
}

module.exports = Utils;