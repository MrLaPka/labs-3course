const express = require("express");
const cookies = require("cookie-parser");

const { getCredential, verPassword } = require("./21-03m.js");
const PORT = 4000;

app = express();
app.use(cookies());
app.use(express.urlencoded({ exteded: true }));

app.get("/login", (req, res, next) => {
  console.log("Login");
  res.sendFile(__dirname + "/form.html");
});

app.post("/login", (req, res, next) => {
  const user = getCredential(req.body.user);
  console.log("params: ", req.body);

  if (user && verPassword(user.password, req.body.password)) {
    res.cookie("token", "xxx-yyy-zzz").redirect("/resource");
  } else res.redirect("/login");
});

app.get("/resource", (req, res) => {
  let cookie = req.cookies;
  console.log(cookie.token);

  if (cookie.token == "xxx-yyy-zzz") res.end("IT'S TIME TO COOK KULICHIKI!!");
  else res.redirect("/login");
});

app.get("/logout", (req, res) => {
  console.log("Logout");
  res.clearCookie("token");

  res.redirect("/login");
});

app
  .listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  })
  .on("error", e => {
    console.log(`Listener | error: ${e.code}`);
  });
