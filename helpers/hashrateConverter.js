import PropTypes from "prop-types";
// 1 kH/s	1000	One thousand
// 1 MH/s	1,000,000	One million
// 1 GH/s	1,000,000,000	One billion
// 1 TH/s	1,000,000,000,000	One trillion
// 1 PH/s	1.000.000.000.000.000	One quadrillion
// 1 EH/s	1.000.000.000.000.000.000	One quintillion
// 1 ZH/s	1.000.000.000.000.000.000.000	One sextillion

const propTypes = {
  hash: PropTypes.number.isRequired,
  decimals: PropTypes.number,
  stringResult: PropTypes.bool,
};

export default function formatHashrate(
  hash,
  decimals = 2,
  stringResult = false,
) {
  if (hash === 0) return "0 H";
  const hashToPrecision = Number(hash).toFixed(20);
  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["H/S", "KH/S", "MH/S", "GH/S", "TH/S", "PH/S"];

  const i = Math.floor(Math.log(hashToPrecision) / Math.log(k));
  const result = {
    hashrate: parseFloat((hashToPrecision / k ** i).toFixed(dm)),
    unit: sizes[i < 0 ? 0 : i],
  };

  if (stringResult) {
    return `${result.hashrate} ${result.unit}`;
  }
  return result;

  //   return `${parseFloat((hash / k ** i).toFixed(dm))} ${sizes[i]}`;
}
formatHashrate.prototypes = propTypes;
