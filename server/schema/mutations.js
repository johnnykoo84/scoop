// const graphql = require('graphql');
// const {
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLID,
// } = graphql;
// const mongoose = require('mongoose');
// const Auth = require('../middlewares/auth');
// const UserType = require('./types/user_type');
//
// const mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     signup: {
//       type: UserType,
//       args: {
//         email: { type: GraphQLString },
//         password: { type: GraphQLString }
//       },
//       resolve(parentValue, args, req) {
//         return Auth.signup({ email, password, req });
//       }
//     }
//   }
// });
//
// module.exports = mutation;
