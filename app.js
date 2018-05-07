let express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  path = require('path');
const debug = require('debug')('app');
const morgan = require('morgan');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

let db;
if (process.env.ENV == 'Test') {
  db = mongoose.connect('mongodb://localhost/patientPortalApp_test');
} else {
  db = mongoose.connect('mongodb://localhost/patientPortalApp');
}

const app = express();
app.use(morgan('combined'));
app.use(express.static('./public'));
app.use('/js',express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/passport.js')(app);
const port = process.env.PORT || 3000;

app.set('views', './src/views');
app.set('view engine', 'ejs');
const PortalUser = require('./models/portalUserModel');
const authRouter = require('./Routes/authRoutes')(PortalUser);
const portalUserRouter = require('./Routes/portalUserRoutes')(PortalUser);
app.use('/auth', authRouter);
app.use('/portaluser', portalUserRouter);
app.get('/', (req, res) => {

  res.render(
    'index',
    {
      title: 'Patient Portal App',
      emailexists : req.query.emailalreadyexists,
      sessiontimeout : req.query.sessiontimeout,
      loginerror : req.query.loginerror
    }
  );
});
app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
    });


app.listen(port, () => {
  debug(`Gulp is running my app on  PORT: ${port}`);
});

module.exports = app;
