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
// API only return 15 last blocks
export const getPoolBlocks = (poolId) =>
  sendRequest(`/api/v2/pools/${poolId}/blocks`, {
    method: "GET",
  });
