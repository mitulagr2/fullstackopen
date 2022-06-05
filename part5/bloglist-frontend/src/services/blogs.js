import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const blogService = {
  setToken: (newToken) => {
    token = "Bearer " + newToken;
  },
  getAll: async () => {
    const config = {
      headers: { Authorization: token },
    };

    try {
      return (await axios.get(baseUrl, config)).data;
    } catch (exception) {
      throw exception.response.data.error;
    }
  },
  create: async (newBlog) => {
    const config = {
      headers: { Authorization: token },
    };

    try {
      return (await axios.post(baseUrl, newBlog, config)).data;
    } catch (exception) {
      throw exception.response.data.error;
    }
  },
  update: async (blog) => {
    const config = {
      headers: { Authorization: token },
    };

    try {
      return (
        await axios.put(
          `${baseUrl}/${blog.id}`,
          { ...blog, likes: blog.likes + 1 },
          config
        )
      ).data;
    } catch (exception) {
      throw exception.response.data.error;
    }
  },
  delete: async (id) => {
    const config = {
      headers: { Authorization: token },
    };

    try {
      return (await axios.delete(`${baseUrl}/${id}`, config)).data;
    } catch (exception) {
      throw exception.response.data.error;
    }
  },
};

export default blogService;
