const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const portalUserModel = new Schema({
  email: { type: String, unique: true },
  hasportalaccess: { type: Boolean, default: false },
  password: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  mobilenumber: { type: String },
});

module.exports = mongoose.model('PortalUser', portalUserModel);
