import axios from "axios";
const baseUrl = "/api/login";

const loginService = {
  login: async (credentials, showNotif) => {
    try {
      return (await axios.post(baseUrl, credentials)).data;
    } catch (exception) {
      throw exception.response.data.error;
    }
  },
};

export default loginService;
