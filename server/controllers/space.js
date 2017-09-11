const Company = require('../models/company');
const SECRET = require('../../config').secret;
const jwt = require('jwt-simple');

module.exports = {
  get:
    (req, res) => {
      const token = req.headers.authorization;
      const decoded = jwt.decode(token, SECRET);
      const companyId = decoded.companyId;
      Company.getAllSpaces(companyId)
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          res.status(400).send(err);
        })
    },

  post:
    (req, res) => {
      const token = req.headers.authorization;
      const decoded = jwt.decode(token, SECRET);
      const companyId = decoded.companyId;
      const { spaceName } = req.body;

      Company.addSpace(companyId, spaceName)
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    },
};
