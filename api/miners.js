import sendRequest from "./sendRequest";

const BASE_PATH = "/api/pools/ergo001/miners";

const getAllMinersStatsApiMethod = () =>
  sendRequest(`${BASE_PATH}`, {
    method: "GET",
  });

export default getAllMinersStatsApiMethod;
