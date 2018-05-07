const express = require('express');


const routes = function (PortalUser) {
  console.log('routes');
  const portalUserRouter = express.Router();
  portalUserRouter.use('/', (req, res, next) => {
          sess = req.session;

          if (req && req.session && req.session.passport && req.session.passport.user && req.session.passport.user._id) {
                  sess._userid = req.session.passport.user._id;
                  PortalUser.findById(req.session.passport.user._id, (err, portaluser) => {
                    if (err) { res.status(500).send(err); } else if (portaluser) {
                      req.portaluser = portaluser;
                      next();
                    } else {
                      res.status(404).redirect('/sessiontimeout=1');
                    }
                  });
          }
          else {
                    res.status(404).redirect('/?sessiontimeout=1');
          }

  });
  portalUserRouter.route('/profile')
    .get((req, res) => {
      res.render(
        'profile',
        {
          title: 'Patient Profile',
          user: req.portaluser,
        },
      );
    })
    .post((req, res) => {

      req.portaluser.firstname = req.body.firstname;
      req.portaluser.lastname = req.body.lastname;
      req.portaluser.mobilenumber = req.body.mobilenumber;
      req.portaluser.email = req.body.email;
      req.portaluser.hasportalaccess = req.body.hasportalaccess;

      req.portaluser.save((err,portaluserupdated) => {
              console.log(portaluserupdated);
        if (err) { res.status(500).send(err); } else {
          res.render(
            'profile',
            {
              title: 'Patient Profile',
              user :portaluserupdated,
            },
          );
        }
      });

    });
  
  return portalUserRouter;
};

module.exports = routes;
