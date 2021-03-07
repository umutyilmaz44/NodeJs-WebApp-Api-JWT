const createError = require('http-errors');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const multer = require('multer');
const logger = require('morgan');
const path = require('path');
const cors = require('cors')
const dot_env=require('dotenv');
dot_env.config();

const apiRoutes = require('./routes/api-routes');
const authRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes');
const iconsRoutes = require('./routes/icons-routes');
const mapRoutes = require('./routes/map-routes');
const notificationsRoutes = require('./routes/notifications-routes');
const rtlRoutes = require('./routes/rtl-routes');
const tablesRoutes = require('./routes/tables-routes');
const typographyRoutes = require('./routes/typography-routes');
const upgradeRoutes = require('./routes/upgrade-routes');
const userProfileRoutes = require('./routes/user-profile-routes');
const userListRoutes = require('./routes/user-list-routes');

const authenticateToken = require('./middlewares/authTokenVerify.middleware');
const checkUserThemeColor = require('./middlewares/userInfo.middleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });
   
const upload = multer({ storage: storage })

const app = express();

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', 'views');
app.set('layout', 'layouts/app-layout');
/**
 * When you run your app, you might notice that all the routes that are requested are logged to the console. 
 * If you want to disable this, you can just comment out this middleware.
 */
app.use(logger('dev'));

/**
 * This takes all the cookies the client sends and puts them in request.cookies. 
 * It also allows you to modify them before sending them back to the client, by changing response.cookies
 */
app.use(cookieParser());

/**
 * You might notice that there are two lines for parsing the body of incoming HTTP requests. 
 * The first line handles when JSON is sent via a POST request and it puts this data in request.body
 */
app.use(bodyParser.json());

/**
 * The second line parses query string data in the URL (e.g. /profile?id=5) and puts this in request.query
 * Create application/x-www-form-urlencoded parser
 */
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * This middleware serves static assets from your public folder. 
 * If you wanted to rename or move the public folder, you can change the path here.
 */
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
// const allowedOrigins = ['http://localhost:3000',
//                       'http://yourapp.com'];
// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin 
//     // (like mobile apps or curl requests)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       const msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));

app.use(authenticateToken);
app.use(checkUserThemeColor);

app.use('/api', apiRoutes.routes);
app.use('/auth', authRoutes.routes);

app.use('/', homeRoutes.routes);
app.use('/icons', iconsRoutes.routes);
app.use('/map', mapRoutes.routes);
app.use('/notifications', notificationsRoutes.routes);
app.use('/rtl', rtlRoutes.routes);
app.use('/tables', tablesRoutes.routes);
app.use('/typography', typographyRoutes.routes);
app.use('/upgrade', upgradeRoutes.routes);
app.use('/user-profile', userProfileRoutes.routes);
app.use('/user-list', userListRoutes.routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { layout: false});
});

// app.listen(process.env.APP_PORT, () => {
//     console.log('App is listening on url http://localhost:3000')
// });

module.exports = app;