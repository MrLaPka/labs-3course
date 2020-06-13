const Users = [
  {
    user: "admin",
    password: "admin"
  },
  {
    user: "user",
    password: "user"
  }
];

const getCredential = user => {
  return Users.find(e => {
    return e.user.toUpperCase() === user.toUpperCase();
  });
};

const verPassword = (pass1, pass2) => {
  return pass1 === pass2;
};

module.exports = {
  getCredential: getCredential,
  verPassword: verPassword
};
