const Company = require('../models/company');
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = {
  get:
    (req, res) => {
      const jwtFromReq = ExtractJwt.fromHeader('authorization');

      // console.log('jwt!!', jwtFromReq(req.headers.authorization));

      console.log('req.query.companyId', req.query.companyId)
      const companyId = req.query;
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
      const { companyId, spaceName } = req.body;
      Company.addSpace(companyId, spaceName)
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    },
};
