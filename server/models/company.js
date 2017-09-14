const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SpaceSchema = require('./space');

const Company = new Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true, // this gives me an error... duplicate index error
    required: true,
  },
  spaces: [SpaceSchema],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
});


// how to pass an error with mongoose
// next(new Error('something went wrong'));

Company.statics.create = function create(name) {
  const newCompany = new this({
    name
  });

  return newCompany.save();
};

Company.statics.findAll = function findAll() {
  return this.find({}).exec();
};

Company.statics.findOneByName = function findOneByName(name) {
  return this.findOne({ name }).exec();
};

Company.statics.getSpaceList = function getSpaceList(companyId) {
  console.log('companyId right before query', companyId);
  return this
    .findById(companyId)
    .populate({ path: 'spaces' })
    .then((result) => {
      console.log('actual query result', result)
      return result;
    })
    .catch(err => Promise.reject(err));
};

Company.statics.addSpace = function addSpace(companyId, spaceName) {
  const companyModel = this;
  return companyModel
    .findOne({ _id: companyId })
    .where('spaces')
    .elemMatch({ name: spaceName })
    .then((space) => {
      console.log('space already exist', space)
      if (space) { return Promise.reject('같은 이름의 지점 이름이 이미 존재합니다.'); }

      return companyModel.findOne({ _id: companyId })
        .then((company) => {
          if (!company) { return Promise.reject('you must add a company first'); }
          // companyModel.find
          console.log('find company', company)
          const newSpace = { name: spaceName };
          company.spaces.push(newSpace);
          console.log('saved a company', company);
          return company.save();
        })
        .catch(err => Promise.reject('could not add a space', err));
    })
    .catch(err => Promise.reject(err));
};

// get dashboard Info
Company.statics.getDashBoardData = function getDashBoardData(companyId, spaceName) {
  console.log('spacename', spaceName)
  const companyModel = this;
  return companyModel
    .findOne({
      _id: companyId
    },
    {
      _id:0,
      spaces: {
        $elemMatch: {
          name: spaceName
        }
      }
    })
    .then((result) => {
      console.log('result found', result);
      return result;
    })
    .catch(err => Promise.reject(err));
}
// before adding a new member I need to have api for plan
// Company.statics.addMember = function addMember(member) {
//   const companyModel = this;
//   const { name, email, mobile, teamId, planId, }
//
// }
// this allows remove all users with the company
// I wouldn't want to remove the company unless company is clean
// Company.pre('remove', (next) => {
//   const User = mongoose.model('User');
//   User.remove({ _id: { $in: this.users } })
//     .then(() => next());
// });

// Company.pre('save', (next) => {
//   this
//     .where('spaces')
//     .elemMatch({ name: this.name })
//     .then((space) => {
//       if (space) {
//         return Promise.reject('space name already exist')
//       }
//       next();
//     });
// });

module.exports = mongoose.model('Company', Company);
