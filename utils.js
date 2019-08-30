const _ = require('lodash');
const moment = require('moment');

const formatDateUnit = (number, unit) => {
  const pluralisedUnit = (number < 1) ? `${unit}s` : unit;
  return `${number} ${pluralisedUnit}`;
};

/**
 *
 * @param {Moment} from
 * @param {Moment} to
 * @returns {{hours: number, seconds: number, months: number, minutes: number, days: number, years: number}}
 */
const getDifference = (from, to) => {
  // get the difference between the moments
  const diff = to.diff(from);
  //express as a duration
  const duration = moment.duration(diff);

  return {
    years: duration.years(),
    months: duration.months(),
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
  }
};

const getFormattedTimeFromNow = (diff) => {
  const {
    years, months, days, hours, minutes, seconds,
  } = diff;
  if (years < 0) {
    return formatDateUnit(years, 'Year');
  }
  if (months < 0) {
    return formatDateUnit(months, 'Month');
  }
  if (days < 0) {
    return formatDateUnit(days, 'Day');
  }
  if (hours < 0) {
    return formatDateUnit(hours, 'Hour');
  }
  if (minutes < 0) {
    return formatDateUnit(minutes, 'Minute');
  }
  if (seconds < 0) {
    return formatDateUnit(seconds, 'Second');
  }
};

class Utils {

  // getFormattedRemainingTime = (timestamp) => {
  getFormattedTimeFromNow = (timestamp) => {
    if (timestamp) {
      const { seconds } = timestamp;
      const diff = getDifference(moment(), moment.unix(seconds)); // moment().countdown(moment.unix(seconds));
      // TODO : logic about what we show and don't show
      const result = getFormattedTimeFromNow(diff);
      return result;
    }
  };

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