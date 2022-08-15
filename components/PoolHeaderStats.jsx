import PropTypes from "prop-types";
import { getAVGHashrate, getPoolEffort } from "../helpers/poolStats";

const propTypes = {
  performance: PropTypes.arrayOf(
    PropTypes.shape({
      poolHashrate: PropTypes.number.isRequired,
      networkHashrate: PropTypes.number.isRequired,
      created: PropTypes.string.isRequired,
    }),
  ).isRequired,
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      poolId: PropTypes.string.isRequired,
      blockHeight: PropTypes.number.isRequired,
      networkDifficulty: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      confirmationProgress: PropTypes.number.isRequired,
      transactionConfirmationData: PropTypes.string.isRequired,
      reward: PropTypes.number.isRequired,
      miner: PropTypes.string.isRequired,
      source: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
      effort: PropTypes.number,
    }),
  ).isRequired,
  connectedMiners: PropTypes.number.isRequired,
  blockCount: PropTypes.number.isRequired,
};
export default function PoolHeaderStats({ performance, blocks, connectedMiners, blockCount }) {
  const confirmedBlocks = getPoolEffort(blocks.filter((block) => block.status === "confirmed"));
  const avgEffort = confirmedBlocks > 0 ? confirmedBlocks : "No confirmed blocks yet";
  return (
    <>
      <div className="basis-1/4 ">
        <div className="">POOL HASHRATE</div>
        <div className="text-4xl">{getAVGHashrate(performance.map((ele) => ele.poolHashrate))}</div>
      </div>
      <div className="basis-1/4">
        <div className="">AVERAGE EFFORT</div>
        <div className="text-4xl">{avgEffort}</div>
      </div>
      <div className="basis-1/4">
        <div className="">MINERS</div>
        <div className="text-4xl">{connectedMiners}</div>
      </div>
      <div className="basis-1/4">
        <div className="">BLOCKS FOUND</div>
        <div className="text-4xl">{blockCount}</div>
      </div>
    </>
  );
}

PoolHeaderStats.propTypes = propTypes;
