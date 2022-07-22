import sendRequest from "./sendRequest";

const BASE_PATH = "/api/pools/ergo02/miners";

const getMinerStatsApiMethod = (minerAddress) =>
  sendRequest(`${BASE_PATH}/${minerAddress}`, {
    method: "GET",
  });

export default getMinerStatsApiMethod;
