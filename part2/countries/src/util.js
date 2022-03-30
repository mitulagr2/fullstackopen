import axios from "axios";

const getURL = (url, successCb) => {
  axios
    .get(url)
    .then(successCb)
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
};

export default getURL;
