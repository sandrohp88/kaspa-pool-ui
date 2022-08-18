import PropTypes from "prop-types";
import moment from "moment";
import formatHashrate from "./hashrateConverter";

const performanceType = PropTypes.arrayOf(
  PropTypes.shape({
    created: PropTypes.string,
    workers: PropTypes.objectOf(
      PropTypes.shape({
        hashrate: PropTypes.number.isRequired,
        sharesPerSecond: PropTypes.number.isRequired,
      }),
    ),
  }),
).isRequired;

const workersType = PropTypes.objectOf(
  PropTypes.shape({
    hashrate: PropTypes.number.isRequired,
    sharesPerSecond: PropTypes.number.isRequired,
  }),
).isRequired;
export function dayAvgHashrate(performance) {
  // performance is recorded every hour, only store one day is stored
  let avgHashrate = 0;
  performance.forEach(({ workers }) => {
    const workersNames = Object.keys(workers);
    workersNames.forEach((workerName) => {
      avgHashrate += workers[workerName].hashrate;
    });
  });
  return formatHashrate(avgHashrate / 24, 2, true);
}

export function getWorkersPerformanceData({ performanceSamples }) {
  const workersHashrateData = performanceSamples.map(({ workers, created }) => {
    const workersNames = Object.keys(workers);
    let workerHashrate = 0;
    workersNames.forEach((name) => {
      workerHashrate += workers[name].hashrate;
    });
    return {
      created: moment(created, moment.ISO_8601).format("HH:mm "),
      hashrate: formatHashrate(workerHashrate, 2, false).hashrate,
    };
  });
  return workersHashrateData;
}

export function workersOnline(workers) {
  const workersNames = Object.keys(workers);
  let online = 0;
  let offline = 0;
  let hashrate = 0;
  const workersData = [];
  workersNames.forEach((name) => {
    workersData.push({
      name,
      hashrate: workers[name].hashrate,
      sharesPerSecond: workers[name].sharesPerSecond,
    });
    hashrate += workers[name].hashrate;
    if (workers[name].hashrate > 0) {
      online += 1;
    } else {
      offline += 1;
    }
  });
  return {
    online,
    offline,
    hashrate: formatHashrate(hashrate, 2, true),
    workers: workersData,
  };
}

dayAvgHashrate.propTypes = performanceType;
workersOnline.propTypes = workersType;
