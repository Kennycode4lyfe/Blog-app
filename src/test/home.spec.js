const request = require("supertest");
const { connect } = require("./database");
const app = require("../index");
const blogModel = require("../models/blogModel");

describe("home", () => {
  let conn;

  beforeAll(async () => {
    conn = await connect();
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it("show the home page", async () => {
    const response = await request(app)
      .get("/home")
      .set("content-type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  it("return a particular blog", async () => {
    await blogModel.create({
      title: "Life of a star",
      Description: "live life on a rollercoaster",
      state: "published",
      reading_time: "2minutes",
      tags: ["loot", "change"],
      body: "lorem ipsum",
    });

    const response = await request(app)
      .get("/blogs/search")
      .set("content-type", "application/json")
      .query({ title: "Life of a star" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("blog");
  });

  it("should return all published blogs", async () => {
    await blogModel.create({
      title: "Life of a star",
      Description: "live life on a rollercoaster",
      state: "published",
      reading_time: "2minutes",
      tags: ["loot", "change"],
      body: "lorem ipsum",
    });

    await blogModel.create({
      title: "Life and works of mozart",
      Description: "Songs in a rhythm",
      state: "published",
      reading_time: "3minutes",
      tags: ["loot", "change"],
      body: "Never compromise",
    });

    const response = await request(app)
      .get("/blogs")
      .set("content-type", "application/json")
      .query({ title: ["loot", "change"], order_by: "reading_time,timestamp" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("blogs");
  });
});
