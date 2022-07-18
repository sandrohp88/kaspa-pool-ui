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
