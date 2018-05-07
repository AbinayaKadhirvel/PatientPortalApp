const express = require('express');


const routes = function (PortalUser) {
  console.log('routes');
  const portalUserRouter = express.Router();
  portalUserRouter.use('/profile/:portalUserID', (req, res, next) => {
    PortalUser.findById(portalUserID, (err, portaluser) => {
      if (err) { res.status(500).send(err); } else if (portaluser) {
        req.portaluser = portaluser;
        next();
      } else {
        res.status(404).redirect('/');
      }
    });
  });
  portalUserRouter.route('/profile/:portalUserID')
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
      req.portaluser.save((err) => {
        if (err) { res.status(500).send(err); } else {
          res.render(
            'profile',
            {
              title: 'Patient Profile',
              firstname: req.portaluser.firstname,
              lastname: req.portaluser.lastname,
            },
          );
        }
      });
    });
  /* portalUserRouter.use('/:patientId', (req, res, next) => {
   PortalUser.findById(req.params.patientId, (err, patient) => {
      if (err) { res.status(500).send(err); } else if (patient) {
        req.patient = patient;
        next();
      } else {
        res.status(404).send('no patient found');
      }
});
  }); */
  /* patientRouter.route('/:patientId')
    .get((req, res) => {ß
      const returnPatient = req.patient.toJSON();

      returnPatient.links = {};
      const newLink = `http://${req.headers.host}/api/patients/?email=${returnPatient.email}`;
      returnPatient.links.FilterByThisEmail = newLink.replace(' ', '%20');
      res.render(
        'profile',
        {
          title: 'Patient Profile',
          firstname: returnPatient.firstname,
          lastname: returnPatient.lastname
        }
      );
    })
    .put((req, res) => {
      req.patient.firstname = req.body.firstname;
      req.patient.lastname = req.body.lastname;
      req.patient.email = req.body.email;
      req.patient.hasportalaccess = req.body.hasportalaccess;
      req.patient.save((err) => {
        if (err) { res.status(500).send(err); } else {
          res.json(req.patient);
        }
      });
    })
    .patch((req, res) => {
      if (req.body._id) { delete req.body._id; }

      for (const p in req.body) {
        req.patient[p] = req.body[p];
      }

      req.patient.save((err) => {
        if (err) { res.status(500).send(err); } else {
          res.json(req.patient);
        }
      });
    })
    .delete((req, res) => {
      req.patient.remove((err) => {
        if (err) { res.status(500).send(err); } else {
          res.status(204).send('Removed');
        }
      });
}); */
  return portalUserRouter;
};

module.exports = routes;
