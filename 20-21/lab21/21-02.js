const app = require('express')();
const passport = require('passport');
const DigestStrategy = require('passport-http').DigestStrategy;
const { getCredential } = require('./21-03m.js');

passport.use(new DigestStrategy({ gop: 'auth' }, (user, done) => {
  let rc = null;
  let cr = getCredential(user);
  if (!cr) rc = done(null, false);
  else rc = done(null, cr.user, cr.password);
  return rc;
}, (params, done) => {
  console.log('parms=', params);
  done(null, true);
}));

app.get('/', passport.authenticate('digest', { session: false }));

app.get('/', (req, res, next) => {
  console.log('get-2');
  next();
});

app.get('/', (req, res, next) => {
  console.log('get-3');
  res.send('okokokok');
});

app.listen(3000, () => console.log('Server has been started on port', 3000));
