import _ from 'lodash';
import moment from 'moment-timezone';

/**
 * Returns the number with the units qualifier
 * @param {Number} number
 * @param {Number} unit
 * @returns {string}
 */
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

let timezone = 'Europe/London'; // GMT

class FT {
  getFormattedTimeFromNow(timestamp) {
    if (timestamp) {
      const {seconds} = timestamp;
      const diff = getDifference(moment(), moment.unix(seconds));
      // TODO : logic about what we show and don't show
      const result = getFormattedTimeFromNow(diff);
      return result;
    }
  }

  isPast(timestamp) {
    if (!_.isEmpty(timestamp)) {
      const { seconds } = timestamp;
      const m = moment.unix(seconds);
      return m.isBefore(moment());
    }

    return false;
  }

  isFuture(timestamp) {
    if (!_.isEmpty(timestamp)) {
      const { seconds } = timestamp;
      const m = moment.unix(seconds);
      return m.isAfter(moment());
    }

    return false;
  }

  secondsFromNow(timestamp) {
    if (timestamp) {
      const { seconds } = timestamp;
      const m = moment.unix(seconds);
      const diff = -moment().diff(m);
      return diff / 1000;
    }
  }

  setTimezone(_timezone) {
    timezone = _timezone;
  }

  /**
   * For a given timestamp returns a date being the start of that day
   * @param {Timestamp} timestamp
   * @param {Number} [addHours = 0]
   * @returns {*}
   */
  getStartOfDay(timestamp, addHours = 0) {
    let m;
    if (timestamp instanceof Date) {
      m = moment(timestamp);
    }
    else if (timestamp && timestamp.seconds) {
      const { seconds } = timestamp;
      m = moment.unix(seconds);
    }
    else {
      return undefined;
    }

    return m
      .startOf('day')
      .tz(timezone)
      .add(addHours, 'hours')
      .toDate();
  };
}

const ft = new FT();

export default ft;
