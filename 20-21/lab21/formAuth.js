exports.authMw = (req, res, next) => {
  if (req.cookies && req.cookies.token) {
    if (req.cookies.token === 'xxx-yyy-zzz') {
      return next();
    }
  }
  res.redirect('/login');
};
