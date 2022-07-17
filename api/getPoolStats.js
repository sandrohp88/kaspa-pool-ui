import sendRequest from "./sendRequest";

const BASE_PATH = "/api/pools";

export const getPoolStats = (poolId) =>
  sendRequest(`${BASE_PATH}/${poolId}`, {
    method: "GET",
  });
