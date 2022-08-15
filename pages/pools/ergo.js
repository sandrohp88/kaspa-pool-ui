import PropTypes from "prop-types";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { getPoolStats, getPoolPerformance, getPoolBlocks } from "../../api/getPoolStats";
import NetworkStats from "../../components/NetworkStats";
import PoolStats from "../../components/PoolStats";
import formatHashrate from "../../helpers/hashrateConverter";
import PoolHeaderStats from "../../components/PoolHeaderStats";

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
  blockCount: PropTypes.number.isRequired,
};

function ErgoPool({ pool, performance, blockCount, blocks }) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState();
  const data = performance.map((elem) => {
    return {
      poolHashrate: formatHashrate(elem.poolHashrate),
      networkHashrate: formatHashrate(elem.networkHashrate),
      created: moment(elem.created, moment.ISO_8601).format("HH:mm "),
    };
  });
  const { hashrate, unit } = formatHashrate(pool.poolStats.poolHashrate);

  const onClickHandler = () => {
    router.push(`/miner/${searchInput}`);
  };
  const searchInputHandler = (event) => {
    setSearchInput(event.target.value);
  };
  return (
    <>
      <div className="flex flex-row border-2  items-center border-teal-600 h-40 rounded-lg space-x-6 mx-8 my-8  text-center font-semibold">
        <PoolHeaderStats
          performance={performance}
          blocks={blocks}
          connectedMiners={pool.poolStats.connectedMiners}
          blockCount={blockCount}
        />
      </div>
      <div className="flex flex-row  items-center border-teal-600 h-20 rounded-2xl  mx-20 my-10  text-center font-semibold justify-center ">
        <input
          type="search"
          className="form-control relative basis-1/2 min-w-0 block  px-3 py-1.5 text-base font-normal text-neutral-700 bg-neutral-800 bg-clip-padding border border-solid border-teal-600 rounded transition ease-in-out m-0 focus:text-neutral-700 focus:bg-neutral focus:border-teal-600 focus:outline-none"
          placeholder="Search by your mining address"
          aria-label="Search"
          aria-describedby="button-addon2"
          onInput={searchInputHandler}
        />
        <button
          className="btn inline-block px-6 py-2.5 bg-teal-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-800 active:shadow-lg transition duration-150 ease-in-out  items-center"
          type="button"
          id="button-addon2"
          onClick={onClickHandler}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="search"
            className="w-4"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-row h-80 space-x-6 mx-8 my-8 text-center text-xs">
        <div className="basis-1/2 border-2 rounded-lg border-teal-600  ">
          <PoolStats data={data} hashrate={hashrate} unit={unit} />
        </div>
        <div className="basis-1/2 border-2 rounded-lg border-teal-600">
          <NetworkStats data={data} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const pool = await getPoolStats("ergo001");
    const poolPerformance = await getPoolPerformance("ergo001");

    // Add defaults values to poolStats
    const poolResponse = pool.pool.poolStats
      ? pool.pool
      : { ...pool.pool, poolStats: { poolHashrate: 0, connectedMiners: 0 } };
    // Add defaults values in case pool performance is empty
    const performance =
      poolPerformance.stats.length === 0
        ? [{ networkHashrate: 0, poolHashrate: 0, created: "DD-MM-YYY" }]
        : poolPerformance.stats;
    const poolBlocks = await getPoolBlocks("ergo001");
    return {
      props: {
        pool: poolResponse,
        performance,
        blocks: poolBlocks,
        blockCount: pool.pool.totalBlocks,
      },
    };
  } catch (error) {
    console.log(error);// eslint-disable-line
    return {};
  }
}

ErgoPool.propTypes = propTypes;
export default ErgoPool;
