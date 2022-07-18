import PropTypes from "prop-types";
import moment from "moment";
import { getPoolStats, getPoolPerformance } from "../../api/getPoolStats";
import NetworkStats from "../../components/NetworkStats";
import PoolStats from "../../components/PoolStats";
import formatHashrate from "../../helpers/hashrateConverter";

const propTypes = {
  pool: PropTypes.shape({
    coin: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }),
    paymentProcessing: PropTypes.shape({
      minimumPayment: PropTypes.number.isRequired,
      payoutScheme: PropTypes.string.isRequired,
    }),
    networkStats: PropTypes.shape({
      networkHashrate: PropTypes.number.isRequired,
      networkDifficulty: PropTypes.number.isRequired,
    }),
    poolStats: PropTypes.shape({
      connectedMiners: PropTypes.number.isRequired,
      poolHashrate: PropTypes.number.isRequired,
    }),
  }).isRequired,

  performance: PropTypes.arrayOf(
    PropTypes.shape({
      poolHashrate: PropTypes.number.isRequired,
      networkHashrate: PropTypes.number.isRequired,
      created: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

function ErgoPool({ pool, performance }) {
  const data = performance.map((elem) => {
    return {
      poolHashrate: formatHashrate(elem.poolHashrate),
      networkHashrate: formatHashrate(elem.networkHashrate),
      created: moment(elem.created, moment.ISO_8601).format("HH:mm "),
    };
  });
  const { hashrate, unit } = formatHashrate(pool.poolStats.poolHashrate);
  return (
    <div className="flex flex-row h-80 space-x-6 mx-8 my-8 text-center">
      <div className="basis-1/2 border-2 rounded-lg border-teal-600 ">
        <PoolStats data={data} hashrate={hashrate} unit={unit} />
      </div>
      <div className="basis-1/2 border-2 rounded-lg border-[#009688]">
        <NetworkStats data={data} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const pool = await getPoolStats("ergo02");
    const poolPerformance = await getPoolPerformance("ergo02");
    return {
      props: { pool: pool.pool, performance: poolPerformance.stats },
    };
  } catch (error) {
    console.log(error);// eslint-disable-line
    return {};
  }
}

ErgoPool.propTypes = propTypes;
export default ErgoPool;
