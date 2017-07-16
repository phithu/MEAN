var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    address: String,
    age: Number,
    images: String

})

var User = mongoose.model('user', userSchema,'user');
module.exports = User;
module.exports.getUser = (callback) => {
    User.find(callback)
}
module.exports.getUserById = (idUser, callback) => {
    User.findById(idUser, callback);
}
module.exports.inserUser = (user, callback) => {
    user.save(callback)
}
module.exports.deleteUserById = (idUser, callback) => {
    User.findByIdAndRemove(idUser, callback)
}
module.exports.updateUserById = (idUser, dataUpdate, callback) => {
    User.findByIdAndUpdate(idUser, dataUpdate, callback)
}