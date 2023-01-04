const request = require("supertest");
const { connect } = require("./database");
const app = require("../index");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

describe("Order Route", () => {
  let conn;
  let token;

  beforeAll(async () => {
    conn = await connect();

  });
  beforeEach(async () => {
    const user = await userModel.create({
      password: "123456",
      first_name: "tobie",
      last_name: "Augustina",
      email: "tobi@mail.com",
    });

    console.log(user)

  const  blogId= await userModel.find({email:"tobi@mail.com"})
console.log(blogId)
    const blog= await blogModel.create({
      title: "Longing to be found",
      Description: "Lurking about the minting space",
      author: user._id,
      tags: ["Art", "Romance"],
      body: "Jade and Jack in the middle of everything",
    });

console.log(blog)
    const loginResponse = await request(app)
      .post("/user/login")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        email: "tobi@mail.com",
        password: "123456",
      });

    token = loginResponse.body.token;


  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it("create a blog", async () => {
    const user = await userModel.find({
      email: "tobi@mail.com",
    });
    console.log(user);
    const response = await request(app)
      .post("/blog/create")
      .set("content-type", "application/json")
      .set("Accept", "application/json")
      .query({ "secret-token": `${token}` })
      .send({
        email: "tobi@mail.com",
        password: "123456",
        title: "Life of a star",
        Description: "live life on a rollercoaster",
        tags: "loot change",
        body: "lorem ipsum",
      });

  
    expect(response.body).toHaveProperty("blog");
    expect(response.body).toHaveProperty("status", true);
  });
  it("should edit a blog", async () => {

    const response = await request(app)
      .put("/blog/draft/Longing to be found")
      .set("content-type", "application/x-www-form-urlencoded")
      
      .query({ "secret-token": `${token}` })
      
      .send({
        Description: "Look through the mirror",
        email:"tobi@mail.com"
      });

    
    expect(response.body).toHaveProperty("updatedBlog");
    expect(response.body).toHaveProperty("status", true);
    expect(response.body.updatedBlog).toHaveProperty("Description");
    expect(response.body.updatedBlog.Description).toEqual(
      "Look through the mirror"
    );

    console.log(response.body.updatedBlog);
  });
  it("should delete a blog", async () => {

    const response = await request(app)
      .delete("/blog/Longing to be found")
      .set("Accept", "application/x-www-form-urlencoded")
      .query({ "secret-token": `${token}` })
      .send({ email: "tobi@mail.com" });

  
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Blog successfully deleted");
  });

  it("should get user blogs", async () => {
    const response = await request(app)
      .get("/blog/user")
      .set("Accept", "application/x-www-form-urlencoded")
      .query({ "secret-token": `${token}` })
      .send({ email: "tobi@mail.com" });
    expect(response.body).toHaveProperty("userBlogs");
  });

  it("should publish a blog", async () => {
    const response = await request(app)
      .put("/blog/publish/Longing to be found")
      .set("Accept", "application/x-www-form-urlencoded")
      .query({ "secret-token": `${token}` })
      .send({ email: "tobi@mail.com" });

    expect(response.body).toHaveProperty("updatedBlog");
  });
});
