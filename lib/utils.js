"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Returns the number with the units qualifier
 * @param {Number} number
 * @param {Number} unit
 * @returns {string}
 */
var formatDateUnit = function formatDateUnit(number, unit) {
  var pluralisedUnit = number < 1 ? "".concat(unit, "s") : unit;
  return "".concat(number, " ").concat(pluralisedUnit);
};

var toDate = function toDate(timestamp) {
  var date;

  if (timestamp instanceof Date) {
    date = (0, _momentTimezone["default"])(timestamp);
  } else if (timestamp && timestamp.seconds) {
    var seconds = timestamp.seconds;
    date = _momentTimezone["default"].unix(seconds);
  }

  return date;
};
/**
 *
 * @param {Moment} from
 * @param {Moment} to
 * @returns {{hours: number, seconds: number, months: number, minutes: number, days: number, years: number}}
 */


var getDifference = function getDifference(from, to) {
  // get the difference between the moments
  var diff = to.diff(from); //express as a duration

  var duration = _momentTimezone["default"].duration(diff);

  return {
    years: duration.years(),
    months: duration.months(),
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds()
  };
};

var _getFormattedTimeFromNow = function getFormattedTimeFromNow(diff) {
  var years = diff.years,
      months = diff.months,
      days = diff.days,
      hours = diff.hours,
      minutes = diff.minutes,
      seconds = diff.seconds;

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

var timezone = 'Europe/London'; // GMT

var FT =
/*#__PURE__*/
function () {
  function FT() {
    _classCallCheck(this, FT);
  }

  _createClass(FT, [{
    key: "getFormattedTimeFromNow",
    value: function getFormattedTimeFromNow(timestamp) {
      if (timestamp) {
        var seconds = timestamp.seconds;
        var diff = getDifference((0, _momentTimezone["default"])(), _momentTimezone["default"].unix(seconds)); // TODO : logic about what we show and don't show

        var result = _getFormattedTimeFromNow(diff);

        return result;
      }
    }
    /**
     * Returns true if the timestamp is now, within a specified tolerance
     * @param {Timestamp} timestamp
     * @param {Number} tolerance - in seconds
     * @returns {*}
     */

  }, {
    key: "isNow",
    value: function isNow(timestamp) {
      var tolerance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (!_lodash["default"].isEmpty(timestamp)) {
        var date = toDate(timestamp);

        if (date) {}

        var now = new Date();
        var fromRange = (0, _momentTimezone["default"])(now).subtract(tolerance, 'seconds');
        var toRange = (0, _momentTimezone["default"])(now).add(tolerance, 'seconds');
        return date.isAfter(fromRange) && date.isBefore(toRange);
      }

      return false;
    }
  }, {
    key: "isPast",
    value: function isPast(timestamp) {
      if (!_lodash["default"].isEmpty(timestamp)) {
        var seconds = timestamp.seconds;

        var m = _momentTimezone["default"].unix(seconds);

        return m.isBefore((0, _momentTimezone["default"])());
      }

      return false;
    }
  }, {
    key: "isFuture",
    value: function isFuture(timestamp) {
      if (!_lodash["default"].isEmpty(timestamp)) {
        var seconds = timestamp.seconds;

        var m = _momentTimezone["default"].unix(seconds);

        return m.isAfter((0, _momentTimezone["default"])());
      }

      return false;
    }
  }, {
    key: "secondsFromNow",
    value: function secondsFromNow(timestamp) {
      if (timestamp) {
        var seconds = timestamp.seconds;

        var m = _momentTimezone["default"].unix(seconds);

        var diff = -(0, _momentTimezone["default"])().diff(m);
        return diff / 1000;
      }
    }
  }, {
    key: "setTimezone",
    value: function setTimezone(_timezone) {
      timezone = _timezone;
    }
    /**
     * For a given timestamp returns a date being the start of that day
     * @param {Timestamp} timestamp
     * @param {Number} [addHours = 0]
     * @returns {*}
     */

  }, {
    key: "getStartOfDay",
    value: function getStartOfDay(timestamp) {
      var addHours = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var m;

      if (timestamp instanceof Date) {
        m = (0, _momentTimezone["default"])(timestamp);
      } else if (timestamp && timestamp.seconds) {
        var seconds = timestamp.seconds;
        m = _momentTimezone["default"].unix(seconds);
      } else {
        return undefined;
      }

      return m.startOf('day').tz(timezone).add(addHours, 'hours').toDate();
    }
  }]);

  return FT;
}();

var ft = new FT();
var _default = ft;
exports["default"] = _default;