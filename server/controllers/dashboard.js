const jwt = require('jwt-simple');
const SECRET = require('../../config').secret;
const Company = require('../models/company');

module.exports = {
  get:
    (req, res) => {
      console.log('here we are at DASHBOARD!!!!!!')
      const token = req.headers.authorization;
      const decoded = jwt.decode(token, SECRET);
      const companyId = decoded.companyId;
      const getAllSpaces = Company.getAllSpaces(companyId);

      Promise.all([getAllSpaces])
        .then((result) => {
          res.json(result[0]);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    },
};
