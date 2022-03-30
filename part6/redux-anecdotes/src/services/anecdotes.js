import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const anecdoteService = {
  getAll: async () => (await axios.get(baseUrl)).data,
  create: async (content) =>
    (await axios.post(baseUrl, { content, votes: 0 })).data,
  update: async (id, newObj) =>
    (await axios.put(`${baseUrl}/${id}`, newObj)).data,
  delete: async (id) => (await axios.delete(`${baseUrl}/${id}`)).data,
};

export default anecdoteService;
