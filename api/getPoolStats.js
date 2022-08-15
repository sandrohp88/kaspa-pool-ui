import sendRequest from "./sendRequest";

const BASE_PATH = "/api/pools";

export const getPoolStats = (poolId) =>
  sendRequest(`${BASE_PATH}/${poolId}`, {
    method: "GET",
  });

export const getPoolPerformance = (poolId) =>
  sendRequest(`${BASE_PATH}/${poolId}/performance`, {
    method: "GET",
  });
// API only return 15 last blocks by default
export const getPoolBlocks = async (poolId) => {
  // ?page=1&pageSize=2000
  // Get the first(last) 15 blocks and pageCount
  const { result, pageCount } = await sendRequest(`/api/v2/pools/${poolId}/blocks`, {
    method: "GET",
  });

  const allBlocks = [...result];
  const blockPromises = [];
  // Store all block promises (more efficient than wait inside loop)
  // I need implement pagination
  
  for (let i = 1; i <= 5; i += 1) {
    blockPromises.push(
      sendRequest(`/api/v2/pools/${poolId}/blocks?page=${i}`, {
        method: "GET",
      }),
    );
  }

  // Wait for all block promises to resolved
  const blocksResolved = await Promise.all(blockPromises);

  // Flatten on blocks in jus one array
  blocksResolved.forEach(({ result: page }) => {
    page.forEach((ele) => allBlocks.push(ele));
  });
  return allBlocks;
};
