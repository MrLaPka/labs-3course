const app = require("express")();
const passport = require("passport");
const DigestStrategy = require("passport-http").DigestStrategy;
const session = require("express-session")({
  resave: false,
  saveUninitialized: false,
  secret: "12345678"
});

let Users = require(__dirname + "/users.json");

const PORT = 3000;

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new DigestStrategy(
    { qop: "auth" },
    (user, done) => {
      let rc = null;
      let cr = getCredential(user);
      if (!cr) {
        console.log("incorrect username");
        rc = done(null, false);
      } else {
        rc = done(null, cr.user, cr.password);
      }
      return rc;
    },
    (params, done) => {
      console.log(`Params: ${JSON.stringify(params)}`);
      done(null, true);
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("serialize", user);
  done(null, user);
});
passport.deserializeUser((user, done) => {
  console.log("deserialize", user);
  done(null, user);
});

app
  .get(
    "/login",
    (req, res, next) => {
      console.log("Login");

      if (req.session.logout && req.headers["authorization"]) {
        req.session.logout = false;

        delete req.headers["authorization"];
      }

      next();
    },
    passport.authenticate("digest"),
    (req, res, next) => {
      if (req.session.logout == undefined) req.session.logout = false;
      next();
    }
  )

  .get("/login", (req, res, next) => {
    res.end("CHRIUSHKI");
  });

app.get("/logout", (req, res) => {
  console.log("Logout");
  req.session.logout = true;
  delete req.headers["authorization"];
  res.redirect("/login");
});

app.get("/resource", (req, res) => {
  console.log("Resource");

  if (req.session.logout == false && req.headers["authorization"])
    res.end("MY FAVORITE GAME IS TIC-TAC-TOE");
  else res.redirect("/login");
});

let getCredential = user => {
  let us = Users.find(u => u.user.toLowerCase() == user.toLowerCase());
  return us;
};
let verPassword = (pass1, pass2) => {
  return pass1 == pass2;
};

app
  .listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  })
  .on("error", e => {
    console.log(`Listener | error: ${e.code}`);
  });
