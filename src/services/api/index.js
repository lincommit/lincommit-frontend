import Axios from "axios";
import store from "@/store";

// Import your API functions here
import ticketsFunctions from "./tickets-api";
import contributionFunctions from "./contributions-api";
import contractsFunctions from "./contract-api";
import softwareFunctions from "./software-api";
import clientFunctions from "./client-api";
import userFunctions from "./user-api";

const defaults = {
  baseURL: store.state.applicationConfiguration.baseUrl
};

function Api(config) {
  const instance = Axios.create(Object.assign({}, defaults, config));
  // Assign them to your Axios instance here
  Object.assign(instance, ticketsFunctions);
  Object.assign(instance, contributionFunctions);
  Object.assign(instance, contractsFunctions);
  Object.assign(instance, softwareFunctions);
  Object.assign(instance, clientFunctions);
  Object.assign(instance, userFunctions);

  instance.interceptors.request.use(
    function(config) {
      var token = store.state.session.jwtToken;
      if (config.headers.Authorization && token !== "Unauthorized") {
        config.headers.Authorization = `Bearer  ${token}`;
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  return instance;
}

export { Api };
export default new Api();
