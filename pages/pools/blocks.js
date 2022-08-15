import moment from "moment";
import PropTypes from "prop-types";
import { getPoolBlocks } from "../../api/getPoolStats";

const propTypes = {
  blocks: PropTypes.arrayOf({
    blockHeight: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    effort: PropTypes.number.isRequired,
    confirmationProgress: PropTypes.number.isRequired,
    transactionConfirmationData: PropTypes.string.isRequired,
    reward: PropTypes.number.isRequired,
    infoLink: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
  }).isRequired,
};
export default function Blocks({ blocks }) {
  return (
    <div className="flex border rounded-lg border-teal-600 my-8">
      <table className="basis-full  rounded-lg text-center">
        <thead className="">
          <tr>
            <th scope="col" className="text-lg text-semibold py-5">
              Number
            </th>
            <th scope="col" className="text-lg text-semibold">
              Type
            </th>
            <th scope="col" className="text-lg text-semibold">
              Date
            </th>
            <th scope="col" className="text-lg text-semibold">
              Miner
            </th>
            <th scope="col" className="text-lg text-semibold">
              Reward
            </th>
            <th scope="col" className="text-lg text-semibold">
              Luck
            </th>
          </tr>
        </thead>
        <tbody className="bg-neutral-700">
          {blocks.map(
            ({ blockHeight, miner, created, reward, status, effort = 0 }) => {
              return (
                <tr key={blockHeight} className="">
                  <td className="px-6 py-6 whitespace-nowrap text-sm font-medium">
                    {blockHeight}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {status}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {created}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {miner}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {reward}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {effort}
                  </td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const blocks = await getPoolBlocks("ergo001");

    // I need to parse the date to prevent hydration
    const parsedBlocks = blocks.map((block) => {
      return { ...block, created: moment(block.created).fromNow() };
    });

    return {
      props: { blocks: parsedBlocks },
    };
  } catch (error) {
    console.log(error); // eslint-disable-line
    return {};
  }
}

Blocks.propTypes = propTypes;
