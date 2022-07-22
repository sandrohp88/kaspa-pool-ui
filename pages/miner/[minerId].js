import PropTypes from "prop-types";
import getMinerStatsApiMethod from "../../api/miner";
import getAllMinersStatsApiMethod from "../../api/miners";
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
    }),
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

export async function getStaticPaths() {
  try {
    const allMiners = await getAllMinersStatsApiMethod();
    // Get the paths we want to pre-render based on miners
    const paths = allMiners.map((miner) => ({ params: { minerId: miner.miner } }));
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false };
  } catch (error) {
    // notify(error);
    return { fallback: false };
  }
}

export async function getStaticProps({ params }) {
  try {
    const fetchedMiner = await getMinerStatsApiMethod(params.minerId);
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
