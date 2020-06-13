const Users = [
  {
    user: 'user',
    password: 'user',
  },
  {
    user: 'john',
    password: 'doe',
  },
  {
    user: 'ave',
    password: 'maria',
  },
];

const getCredential = (user) => {
  return Users.find((e) => {
    return e.user.toUpperCase() === user.toUpperCase();
  });
};

const verPassword = (pass1, pass2) => {
  return pass1 === pass2;
};

module.exports = {
  getCredential: getCredential,
  verPassword: verPassword,
};
