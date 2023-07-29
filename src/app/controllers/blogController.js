const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

exports.getPublishedBlogs = async (req, res) => {
  const blogQuery = req.query;

  const {
    title,
    author,
    tags,
    per_page = 20,
    order_by,
    order = "asc",
  } = blogQuery;

  findQuery = {};
  if (title) {
    findQuery.title = title;
  }

  if (author) {
    const authorName = author.split(" ");

    let [first_name, last_name] = authorName;
    const authorData = await userModel.findOne({ first_name });
    const authorId = authorData._id;

    findQuery.author = authorId;
  }

  if (tags) {
    findQuery.tags = { $in: seperateTags };
  }
  const SortQuery = {};
  if (order_by) {
    const sortAttributes = order_by.split(",");

    for (const attribute of sortAttributes) {
      if (order === "asc" && order_by) {
        SortQuery[attribute] = 1;
      }
      if (order === "desc" && order_by) {
        SortQuery[attribute] = -1;
      }
    }
  }

  const blogs = await blogModel.find(findQuery).sort(SortQuery).limit(per_page);
  return res.json({ status: true, blogs });
};

exports.getPublishedBlog = async (req, res) => {
  const blogQuery = req.query;

  const { state = "published", title, author, tags } = blogQuery;

  findQuery = {};
  if (state) {
    findQuery.state = state;
  }
  if (state && title) {
    findQuery.title = title;
  }

  if (state && author) {
    const authorName = author.split(" ");

    let [first_name, last_name] = authorName;
    const authorData = await userModel.findOne({ first_name });
    const authorId = authorData._id;

    findQuery.author = authorId;
  }

  if (state && tags) {
    const seperateTags = tags.split(" ");

    findQuery.tags = { $in: seperateTags };
  }

  const blog = await blogModel
    .findOneAndUpdate(findQuery, { $inc: { read_count: 1 } })
    .populate({ path: "author", select: "first_name last_name" });

  return res.json({ status: true, blog });
};

exports.createBlog = async (req, res) => {
  const blogContents = req.body;

  const user = await userModel.findOne({ email: blogContents.email });

  const readingTime = function () {
    const blogWords = blogContents.body.split(" ");
    const blogLength = blogWords.length;
    const estimatedTimeInMinutes = blogLength / 250;
    return `${estimatedTimeInMinutes} minutes`;
  };
  const tags = blogContents.tags;
  const tagsArray = function (tags) {
    let blogTag = blogContents.tags.split(" ");

    return blogTag;
  };
  blogContents.tags = tagsArray(tags);

  blogContents.reading_time = readingTime();
  blogContents.author = user._id;
  blogContents.state = "draft";

  const blog = await blogModel.create(blogContents);

  return res.json({ status: true, blog });
};

exports.publishBlog = async (req, res) => {
  const email = req.body.email;
  const titleParam = req.params.title;
  const user = await userModel.findOne({ email });
  const userBlog = await blogModel.findOne({ title: titleParam });
  if (user._id.equals(userBlog.author)) {
    const updatedBlog = await blogModel.findOneAndUpdate(
      { title: titleParam },
      { state: "published" }
    );
    return res.json({ updatedBlog });
  } else {
    return res.json({ message: "You cannot publish this blog" });
  }
};

exports.editBlog = async (req, res) => {
  const email = req.body.email;
  const titleParam = req.params.title;
  const expectedUpdate = req.body;
  const user = await userModel.findOne({ email });
  const userBlog = await blogModel.findOne({ title: titleParam });
  if (user._id.equals(userBlog.author)) {
    const updatedBlog = await blogModel
      .findOneAndUpdate({ title: titleParam }, expectedUpdate, {
        returnOriginal: false,
      })
      .populate({ path: "author", select: "first_name last_name" });

    return res.json({ updatedBlog, status: true });
  } else {
    return res.json({ message: "You cannot edit this blog" });
  }
};

exports.deleteBlog = async (req, res) => {
  const email = req.body.email;
  const titleParam = req.params.title;
  const user = await userModel.findOne({ email });
  const userBlog = await blogModel.findOne({ title: titleParam });
  if (user._id.equals(userBlog.author)) {
    const updatedBlog = await blogModel.findOneAndDelete({ title: titleParam });
    return res.json({ message: "Blog successfully deleted" });
  } else {
    return res.json({ message: "You cannot delete this blog" });
  }
};

exports.getUserBlogs = async (req, res) => {
  const email = req.body.email;
  const blogQuery = req.query;
  const { state } = blogQuery;
  findQuery = {};
  if (state) {
    const user = await userModel.findOne({ email });
    const userBlogs = await blogModel.find({ author: user._id }, findQuery);

    return res.json({ userBlogs });
  } else {
    const user = await userModel.findOne({ email });
    const userBlogs = await blogModel.find({ author: user._id });
    return res.json({ userBlogs });
  }
};
