var mongoose = require('mongoose'),
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
  }

});

mongoose.model('User', UserSchema);