import PropTypes from "prop-types";
import colors from "tailwindcss/colors";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { dayAvgHashrate, workersOnline, getWorkersPerformanceData } from "../helpers/minerStats";
import formatHashrate from "../helpers/hashrateConverter";

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

function MinerStats({ miner, minerId }) {
  const { online, offline, hashrate, workers } = workersOnline(miner.performance.workers);

  return (
    <>
      <div className="flex flex-row space-x-6 mx-8 my-8 py-10 justify-center">
        <div className="flex basis-3/4 border rounded-md border-teal-600   justify-center items-center  font-semibold h-16 text-xl ">
          {minerId}
        </div>
      </div>
      <div className="flex flex-row  space-x-6 mx-8 my-8  text-2xl h-32 align-center font-semibold">
        <div className="basis-1/3 border-2 rounded-lg p-5 border-teal-600 ">
          <p>Workers Online/Offline</p>
          <p>{`${online}/${offline}`}</p>
        </div>
        <div className="basis-1/3 border-2 rounded-lg p-5 border-teal-600">
          <p>Unpaid balance</p>
          <p>{miner.pendingBalance}</p>
        </div>
        <div className="basis-1/3 border-2 p-5 rounded-lg border-teal-600">
          {/* TODO */}
          <p> Estimate earnings (daily)</p>
          <p> 123 ERG</p>
        </div>
      </div>
      <div className="flex flex-row space-x-6 mx-8 my-8 py-10 justify-center">
        <div className="basis-1/2 border rounded-md border-teal-600  font-semibold h-36 text-xl p-3">
          <div className="flex border-b border-b-teal-600">
            <div className="basis-full pb-2 ">
              <p>Hashrate</p>
            </div>
          </div>
          <div className="flex pt-2 text-2xl text-center">
            <div className="basis-1/3">
              <p>{hashrate}</p>
              <p className="text-lg">Current effective</p>
            </div>
            <div className="basis-1/3">
              <p>{dayAvgHashrate(miner.performanceSamples)}</p>
              <p className="text-lg">24H avg</p>
            </div>
            <div className="basis-1/3">
              {/* TODO */}
              <p>800 mhs</p>
              <p className="text-lg">Reported</p>
            </div>
          </div>
        </div>
        <div className="basis-1/2 border rounded-md border-teal-600  font-semibold h-36 text-xl p-3">
          <div className="flex border-b border-b-teal-600">
            {/* TODO */}
            <div className="basis-full pb-2 ">
              <p>Shares (last 24 hours) NOT IMPLEMENTED YET</p>
            </div>
          </div>
          <div className="flex pt-2 text-2xl text-center">
            <div className="basis-1/3">
              <p>19,366</p>
              <p className="text-lg">Valid (99.03%)</p>
            </div>
            <div className="basis-1/3">
              <p>190</p>
              <p className="text-lg">Stale (0.97%)</p>
            </div>
            <div className="basis-1/3">
              <p>0</p>
              <p className="text-lg">Invalid (0%)</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border rounded-md border-teal-600 p-3   justify-center items-center font-semibold h-80 mx-8 my-8 ">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={getWorkersPerformanceData(miner)}
            margin={{
              top: 30,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="created" />
            <YAxis unit=" mh/s" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="hashrate"
              stroke={colors.teal[600]}
              activeDot={{ r: 8 }}
              strokeWidth={5}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex border rounded-lg border-teal-600 my-8">
          <table className="basis-full  rounded-lg text-center">
            <thead className="">
              <tr>
                <th scope="col" className="text-lg text-semibold py-5">
                  Worker
                </th>
                <th scope="col" className="text-lg text-semibold">
                  Hashrate
                </th>
                <th scope="col" className="text-lg text-semibold">
                  Shares/second
                </th>
                <th scope="col" className="text-lg text-semibold">
                  Valid shares
                </th>
              </tr>
            </thead>
            <tbody className="bg-neutral-700">
              {workers.map(({ name, hashrate: speed, sharesPerSecond }) => {
                return (
                  <tr key={`${name}_${speed}`} className="">
                    <td className="px-6 py-6 whitespace-nowrap text-sm font-medium">{name}</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {formatHashrate(speed, 2, true)}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {sharesPerSecond}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      to be implemented
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
MinerStats.propTypes = propTypes;
export default MinerStats;
