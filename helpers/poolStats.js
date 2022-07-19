import PropTypes from "prop-types";
import formatHashrate from "./hashrateConverter";

const avgPropTypes = {
  performance: PropTypes.arrayOf(
    PropTypes.shape({
      poolHashrate: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

const blocksPropTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      effort: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    }),
  ),
};
export function getAVGHashrate(performance) {
  const avg = performance.reduce((prev, current) => prev + current, 0);

  const { hashrate, unit } = formatHashrate(avg / performance.length);
  return `${hashrate} ${unit}`;
}

export function getPoolEffort(blocks) {
  const effort = blocks.reduce((prev, current) => prev + current, 0);
  return `${(effort / blocks.length) * 100}%`;
}

getPoolEffort.prototypes = blocksPropTypes;
getAVGHashrate.propTypes = avgPropTypes;
