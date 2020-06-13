const express = require("express");
const fs = require("fs");
const cp = require("cookie-parser");
const { getCredential, verPassword } = require("./21-03m.js");
const { authMw } = require("./formAuth");

const app = express();
app.use(cp());
app.use(express.urlencoded({ extended: true }));
app.use(/\/((?!login).)*/, authMw);

app.get("/login", (req, res, next) => {
  const loginPageRs = fs.ReadStream("./21-06.html");
  loginPageRs.pipe(res);
});

app.post("/login", (req, res, next) => {
  console.log("params", req.body);

  const user = getCredential(req.body.login);
  if (user && verPassword(user.password, req.body.password)) {
    res.cookie("token", "xxx-yyy-zzz").redirect("/");
  } else {
    res.redirect("/login?error");
  }
});

app.get("/", (req, res, next) => {
  res.send("home");
});

app.get("/resource", (req, res, next) => {
  res.send("resource");
});

app.get("/logout", function(req, res) {
  console.log("get-4");
  res.redirect("/login");
});

app.listen(3000, () => {
  console.log("Server has been started on port", 3000);
});
