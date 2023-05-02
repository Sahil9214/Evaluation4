const express = require("express");
const PostRouter = express.Router();
const { PostModel } = require("../models/Post.models");
PostRouter.get("/", async (req, res) => {
  const { device } = req.body;
  const query = {};
  if (device) {
    query.device = device;
  }

  try {
    let data = await PostModel.find(query);
    res.status(200).send({ msg: "Data shown", data: data });
  } catch (err) {
    res.status(400).send({ msg: "Data cannot be fetched" });
  }
});
PostRouter.post("/addPosts", async (req, res) => {
  try {
    let data = new PostModel(req.body);
    console.log("data", data);
    await data.save();
    res.status(200).send({ msg: "Data shown", data: data });
  } catch (err) {
    res.status(400).send({ msg: "Data cannot be fetched" });
  }
});
PostRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;

  const user = await PostModel.findOne({ email });
  if (user) {
    try {
      let data = await PostModel.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).send("data will be updated");
    } catch (err) {
      res.status(400).send({ msg: "cannot update the data" });
    }
  }
});
PostRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  const user = await PostModel.findOne({ email });
  if (user) {
    try {
      let data = await PostModel.findByIdAndDelete({ _id: id });
      res.status(200).send("data will be updated");
    } catch (err) {
      res.status(400).send({ msg: "cannot update the data" });
    }
  }
});

module.exports = { PostRouter };
