const app = require('express')();
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const session = require('express-session')(
  {
    resave: false,
    saveUninitialized: false,
    secret: '12345678'
  }
);

let Users = require(__dirname+'/users.json');

const PORT = 3000;

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new BasicStrategy((user, password, done)=>{
  console.log('passport.use', user, password);
  let rc = null;
  let cr = getCredentials(user);
  if (!cr) rc = done(null, false, {message:'incorrect username'});
  else if (!verPassword(cr.password, password)) rc = done(null, false, {message:'incorrect password'});
  else rc = done(null, user, {message:'ok'});
  return rc;
}));

passport.serializeUser((user, done)=>{
  console.log('serialize', user);
  done(null, user);
});
passport.deserializeUser((user, done)=>{
  console.log('deserialize', user);
  done(null, user);
});

app.get('/login', (req, res, next)=>{
  console.log('Login')

  if(req.session.logout && req.headers['authorization']){
    req.session.logout = false;

    delete req.headers['authorization'];
  }

  next();
},
passport.authenticate('basic'), (req, res, next)=>{
  if(req.session.logout == undefined)
    req.session.logout = false;
  next();
})

.get('/login', (req, res, next)=>{
  res.end('COCACOLA');
})

app.get('/logout', (req, res)=>{
  console.log('Logout');
  req.session.logout = true;
  delete req.headers['authorization'];
  res.redirect('/login');
})

app.get('/resource', (req, res)=>{
  console.log('I LOVE CHEETOS');

  if(req.session.logout == false && req.headers['authorization'])
    res.end('I LOVE CHEETOS');
  else
    res.redirect('/login')
});

let getCredentials = (user) =>{
  let us = Users.find(u => u.user.toLowerCase() == user.toLowerCase());
  return us;
};
let verPassword = (pass1, pass2) =>{
  return pass1 == pass2;
};

app.listen(PORT, () =>
{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`Listener | error: ${e.code}`)});
