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

      console.log('req.query', req.query);

      const spaceName = req.query.name;
      console.log('spaceName', spaceName)
      Company.getDashBoardData(companyId, spaceName)
        .then((result) => {
          console.log('controller result', result);
          res.json(result);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    },
};
