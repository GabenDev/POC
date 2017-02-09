var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
	name: String
});

UserSchema.methods.from = function(req) {
  this.name = req.body.name;
  return this;
};

module.exports = mongoose.model('User', UserSchema);
