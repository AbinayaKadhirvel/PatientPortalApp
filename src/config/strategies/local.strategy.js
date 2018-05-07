const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');
const PortalUser = require('../../../models/portalUserModel');

module.exports = function localStrategy() {
        console.log('main f')
  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
        const query = {};
        query.email = email;
        PortalUser.findOne(query, (err, portaluser) => {
                if (portaluser.password === password) {
                         done(null, portaluser);
                }
                else {
                        done(null,false);
                }

        });
  }));
};
