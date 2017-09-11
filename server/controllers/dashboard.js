const jwt = require('jwt-simple');
const SECRET = require('../../config').secret;
const Company = require('../models/company');

module.exports = {
  get:
    (req, res) => {
      console.log('here we are at DASHBOARD!!!!!!')
      const token = req.headers.authorization;
      console.log('token', token)
      const decoded = jwt.decode(token, SECRET);
      console.log('decoded', decoded)
      const companyId = decoded.companyId;
      console.log('companyid before query', companyId)
      const getAllSpaces = Company.getAllSpaces(companyId);

      Promise.all([getAllSpaces])
        .then((result) => {
          console.log('get all space result', result);
          res.json(result[0]);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    },
};
