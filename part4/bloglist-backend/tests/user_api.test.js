const supertest = require("supertest");
const mongoose = require("mongoose");
const { initialUsers } = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const User = require("../models/user");

describe("When there are users saved initially:", () => {
  beforeAll(async () => {
    await User.deleteMany({});
    for (let user of initialUsers) {
      await api.post("/api/users").send(user);
    }
  });

  test("all users are returned", async () => {
    const getAll = await api.get("/api/users");
    expect(getAll.body).toHaveLength(initialUsers.length);
  });

  test("creation succeeds with new username", async () => {
    const newUser = { username: "mitul-agr", password: "mitul-agr" };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const { body } = await api.get("/api/users");
    expect(body).toHaveLength(initialUsers.length + 1);

    const usernameList = body.map((u) => u.username);
    expect(usernameList).toContain("mitul-agr");

    initialUsers.push(newUser);
  });

  test("creation fails if username is already taken", async () => {
    const res = await api
      .post("/api/users")
      .send({ username: "mitul-agr", password: "mitul-agr" })
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(res.error.text).toContain("username must be unique");

    const getAll = await api.get("/api/users");
    expect(getAll.body).toHaveLength(initialUsers.length);
  });

  test("login fails with incorrect details", async () => {
    const res = await api
      .post("/api/login")
      .send({ username: "root", password: "wrong" })
      .expect(401)
      .expect("Content-Type", /application\/json/);

    expect(res.body.token).not.toBeDefined();
    expect(res.body.error).toEqual("password is incorrect");
  });

  test("login succeeds with correct details", async () => {
    const res = await api
      .post("/api/login")
      .send({ username: "root", password: "toor" })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(res.body.token).toBeDefined();
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
