const supertest = require("supertest");
const mongoose = require("mongoose");
const { initialBlogs } = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const User = require("../models/user");
const Blog = require("../models/blog");
let userSessionToken;

beforeAll(async () => {
  await User.deleteMany({});
  await api.post("/api/users").send({ username: "root", password: "toor" });
  const res = await api
    .post("/api/login")
    .send({ username: "root", password: "toor" });

  userSessionToken = res.body.token;

  await Blog.deleteMany({});
  for (let blog of initialBlogs) {
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${userSessionToken}`)
      .send(blog);
  }
});

describe("When there are blogs saved initially:", () => {
  test("blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${userSessionToken}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const { body } = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${userSessionToken}`);
    expect(body).toHaveLength(initialBlogs.length);
  });

  test("blog's unique identifiers are named 'id'", async () => {
    const { body } = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${userSessionToken}`);
    for (let { id } of body) expect(id).toBeDefined();
  });
});

describe("Addition of a new blog:", () => {
  test("succeeds with VALID data", async () => {
    const newBlog = {
      title: "Beyond Tech: Growwing as an Engineer",
      author: "Shivang Agrawal",
      url: "https://tech.groww.in/beyond-tech-growwing-as-an-engineer-c3168cbbc214",
      likes: 228,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${userSessionToken}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const { body } = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${userSessionToken}`);
    expect(body).toHaveLength(initialBlogs.length + 1);

    const blogTitles = body.map((b) => b.title);
    expect(blogTitles).toContain("Beyond Tech: Growwing as an Engineer");

    initialBlogs.push(newBlog);
  });

  test("defaults 'likes' to zero if they are missing", async () => {
    const newBlog = {
      title: "What’s New in Flutter 2.8",
      author: "Chris Sells",
      url: "https://medium.com/flutter/whats-new-in-flutter-2-8-d085b763d181",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${userSessionToken}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const { body } = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${userSessionToken}`);
    expect(body).toHaveLength(initialBlogs.length + 1);

    const addedBlog = body.find(
      (blog) =>
        blog.url ===
        "https://medium.com/flutter/whats-new-in-flutter-2-8-d085b763d181"
    );
    expect(addedBlog.likes).toBe(0);

    initialBlogs.push(newBlog);
  });

  test("fails with status code '400' if data is invaild", async () => {
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${userSessionToken}`)
      .send({ author: "Shivang Agrawal", likes: 228 })
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const { body } = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${userSessionToken}`);
    expect(body).toHaveLength(initialBlogs.length);
  });
});

describe("Deletion of a blog:", () => {
  test("succeeds with status code '204' if 'id' is VALID", async () => {
    const prevBlogs = (await Blog.find({})).map((blog) => blog.toJSON());
    const blogToDelete = prevBlogs[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${userSessionToken}`)
      .expect(204);

    const { body } = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${userSessionToken}`);
    expect(body).toHaveLength(prevBlogs.length - 1);

    const blogTitles = body.map((b) => b.title);
    expect(blogTitles).not.toContain(blogToDelete.title);

    initialBlogs.splice(0, 1);
  });

  test("fails with status code '401' if token is missing", async () => {
    const prevBlogs = (await Blog.find({})).map((blog) => blog.toJSON());
    const blogToDelete = prevBlogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);

    const { body } = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${userSessionToken}`);
    expect(body).toHaveLength(prevBlogs.length);

    const blogTitles = body.map((b) => b.title);
    expect(blogTitles).toContain(blogToDelete.title);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
