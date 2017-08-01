const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLNonNull } = graphql;
const UserType = require('./types/user_type');
const User = mongoose.model('User');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        // return req.user;
        return User.findAll({});
      }
    },
    user: {
      type: UserType,
      args: { email: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, { email }) {
        return User.findOneByEmail(email);
      }
    }
  })
});

module.exports = RootQuery;
