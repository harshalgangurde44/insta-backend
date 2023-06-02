const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const layout = require("./model/model");

const PORT = process.env.PORT || 3002;
//port connections
app.listen(PORT, () => {
  console.log("Connected to 3002 port");
});
//middlewares

app.use(express.json());
app.use(cors());
//database connection
mongoose
  .connect(
    "mongodb+srv://harshalg:jIUmTYRS86P0aD08@app.wen0ngb.mongodb.net/instadata"
  )
  .then(() => {
    console.log("connected to DataBase...");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/", (req, res) => {
  res.send("Home Page");
});
app.post("/post", (req, res) => {
  const link = req.body.imageLink;
  const author = req.body.authorName;
  const location = req.body.locationName;
  const description = req.body.descriptionName;
  layout
    .create({
      PostImage: link,
      name: author,
      location: location,
      description: description,
      date: "2-June-2023",
      likes: "50",
    })
    .then((user) => {
      console.log(user.name, "created succesfully");
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/posts", (req, res) => {
  layout
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "Error retrieving data from the database" });
    });
});
