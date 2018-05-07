const express = require('express');
const passport = require('passport');

const authRouter = express.Router();

function router(PortalUser) {
  authRouter.route('/signup')
    .post((req, res) => {
      if (!req.body.email) {
        res.status(400);
        res.send('Email is required');
      } else {
        PortalUser.findOne({ email: req.body.email }, (err, portaluser) => {
          if (portaluser) {
            res.redirect('/?emailalreadyexists=1');
          } else {
            const portalusertocreate = new PortalUser(req.body);

            portalusertocreate.save((err, portaluseradded) => {
              if (err) {
                res.status(500).send(err);
              } else {
                req.login(portaluseradded, () => {
                  res.redirect('/portaluser/profile');
                });
              }
            });
          }
        });
      }
    });
  authRouter.route('/signin')
    .post(passport.authenticate('local', {
      successRedirect: '/portaluser/profile',
      failureRedirect: '/',
    }));
  return authRouter;
}

module.exports = router;
