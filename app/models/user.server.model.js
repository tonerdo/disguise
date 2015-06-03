var bcrypt = require('bcrypt-nodejs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({

  username: {
    type: String,
    required: "Username must be specified"
  },

  password: {
    type: String
  },

  created: {
    type: Date,
    default: Date.now
  },

  _token: {
    type: String
  }

});

UserSchema.methods.createToken = function(username) {
  return bcrypt.hashSync(username + Date.now, bcrypt.genSaltSync(2), null);
};

mongoose.model('User', UserSchema);