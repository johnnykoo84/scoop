const Company = require('../models/company');
const SECRET = require('../../config').secret;
const jwt = require('jwt-simple');

module.exports = {
  get:
    (req, res) => {
      const token = req.headers.authorization;
      const companyId = jwt.decode(token, SECRET).companyId;

      Company.getAllSpaces(companyId)
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    },

  post:
    (req, res) => {
      // const token = req.headers.authorization; // for post, client saves token in req.body
      const { token, spaceName } = req.body;
      console.log('token', req.body)
      console.log('spaceName', spaceName);
      const companyId = jwt.decode(token, SECRET).companyId;
      console.log('lets see', token, companyId);
      Company.addSpace(companyId, spaceName)
        .then((result) => {
          console.log('saved result', result)
          res.json(result);
        })
        .catch((err) => {
          console.log('err from the mognoosemodel', err);
          res.status(400).send(err);
        });
    },
};
