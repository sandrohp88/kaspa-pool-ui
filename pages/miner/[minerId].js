import PropTypes from "prop-types";
import getMinerStatsApiMethod from "../../api/miner";
import MinerStats from "../../components/MinerStats";

const propTypes = {
  miner: PropTypes.shape({
    pendingBalance: PropTypes.number.isRequired,
    performance: PropTypes.shape({
      created: PropTypes.string,
      workers: PropTypes.objectOf(
        PropTypes.shape({
          hashrate: PropTypes.number.isRequired,
          sharesPerSecond: PropTypes.number.isRequired,
        }),
      ),
    }).isRequired,
    performanceSamples: PropTypes.arrayOf(
      PropTypes.shape({
        created: PropTypes.string,
        workers: PropTypes.objectOf(
          PropTypes.shape({
            hashrate: PropTypes.number.isRequired,
            sharesPerSecond: PropTypes.number.isRequired,
          }),
        ),
      }),
    ).isRequired,
  }).isRequired,
  minerId: PropTypes.string.isRequired,
};

function Miner({ miner, minerId }) {
  return <MinerStats miner={miner} minerId={minerId} />;
}

export async function getServerSideProps({ params }) {
  try {
    const fetchedMiner = await getMinerStatsApiMethod(params.minerId);
    if (!fetchedMiner.performance) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        miner: fetchedMiner,
        minerId: params.minerId,
        performanceSamples: fetchedMiner.performanceSamples,
      },
    };
  } catch (error) {
    // notify(error);
    return { props: { miner: null } };
  }
}

Miner.propTypes = propTypes;
export default Miner;
