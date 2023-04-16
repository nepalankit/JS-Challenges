import express from "express";
import path from "path";
const app = express();
const user = [];
//using middleware
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
//setting up view engine
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index", { Name: "bankit" });
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

app.listen(5000, () => {
  console.log("Server is working");
});
