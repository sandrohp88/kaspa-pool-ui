import {
  ResponsiveContainer,
  AreaChart,
  Area,
  YAxis,
  Tooltip,
  Legend,
  XAxis,
} from "recharts";
import colors from "tailwindcss/colors";
import PropTypes from "prop-types";

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      poolHashrate: PropTypes.shape({
        hashrate: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
      }),
      created: PropTypes.string.isRequired,
      networkHashrate: PropTypes.shape({
        hashrate: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
};
function NetworkStats({ data }) {
  return (
    <>
      <h2 className="text-xl font-semibold">{`Network Hashrate: ${
        data[data.length - 1].networkHashrate.hashrate
      } ${data[data.length - 1].networkHashrate.unit}`}</h2>

      <ResponsiveContainer>
        <AreaChart
          width={600}
          height={300}
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorHash" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={colors.teal[600]}
                stopOpacity={0.8}
              />
              <stop offset="95%" stopColor={colors.teal[600]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="created" />
          <YAxis unit=" mh/s" />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="networkHashrate.hashrate"
            stroke={colors.teal[600]}
            fill="url(#colorHash)"
            fillOpacity={1}
            unit=" MH/S"
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}

NetworkStats.propTypes = propTypes;
export default NetworkStats;
