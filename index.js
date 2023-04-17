import express from "express";
import path from "path";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
  })
  .then(() => console.log("DataBase Connected"))
  .catch((e) => console.log(e));

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Messge = mongoose.model("message", messageSchema);

const app = express();
const user = [];
//using middleware
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
//setting up view engine
app.set("view engine", "ejs");

app.get("/add", async (req, res) => {
  await Messge.create({ name: "Ankit", email: "sample2@gmail.com" }).then(
    () => {
      res.send("nice");
    }
  );
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.post("/contact", (req, res) => {
  console.log(req.body);

  user.push({ userName: req.body.name, email: req.body.email });

  res.redirect("/success");
});

app.get("/user", (req, res) => {
  res.json({
    user,
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(5000, () => {
  console.log("Server is working");
});
