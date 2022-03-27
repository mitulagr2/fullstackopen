import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const personsService = {
  getAll: () => axios.get(baseUrl).then((response) => response.data),
  create: (newObject) =>
    axios.post(baseUrl, newObject).then((response) => response.data),
  update: (id, newObject) =>
    axios.put(`${baseUrl}/${id}`, newObject).then((response) => response.data),
  delete: (id) =>
    axios.delete(`${baseUrl}/${id}`).then((response) => response.data),
};

export default personsService;
