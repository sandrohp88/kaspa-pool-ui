import sendRequest from "./sendRequest";

const BASE_PATH = "/api/pools/ergo001/miners";

const getMinerStatsApiMethod = (minerAddress) =>
  sendRequest(`${BASE_PATH}/${minerAddress}`, {
    method: "GET",
  });

export default getMinerStatsApiMethod;
