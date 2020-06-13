exports.getHomeIndex = (req, res, next) => {
  if (!req.params.p) res.send(`GET home/index ${req.params.p}`);
  else res.send(`GET home/index`);
};

exports.postHomeIndex = (req, res, next) => {
  if (!req.params.p) res.send(`POST home/index ${req.params.p}`);
  else res.send(`POST home/index`);
};

exports.getHomeAccount = (req, res, next) => {
  if (req.params.p) res.send(`GET home/account ${req.params.p}`);
  else res.send(`GET home/account`);
};

exports.postHomeAccount = (req, res, next) => {
  if (req.params.p) res.send(`POST home/account ${req.params.p}`);
  else res.send(`POST home/account`);
};

exports.getCalcSalary = (req, res, next) => {
  if (req.params.p) res.send(`GET calc/salary ${req.params.p}`);
  else res.send(`GET calc/salary`);
};

exports.postCalcSalary = (req, res, next) => {
  if (req.params.p) res.send(`POST calc/salary ${req.params.p}`);
  else res.send(`POST calc/salary`);
};

exports.getCalcTrans = (req, res, next) => {
  if (req.params.p) res.send(`GET calc/trans ${req.params.p}`);
  else res.send(`GET calc/trans`);
};

exports.postCalcTrans = (req, res, next) => {
  if (req.params.p) res.send(`POST calc/trans ${req.params.p}`);
  else res.send(`POST calc/trans`);
};
