require('dotenv').config();
const jwt = require('jsonwebtoken');
const localStorage = require("localStorage");


const authenticateToken = (req, res, next) => {
  let authrequired = true;
  switch(req.originalUrl){    
    case '/auth/login':
    case '/auth/register':
    case '/auth/logout':
    case '/api/auth/token':    
      authrequired = false;
      break;
    default:
      authrequired = true;
      break;
  }

  if(authrequired){
    let accessToken='';

    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    accessToken = authHeader && authHeader.split(' ')[1]
    if (accessToken == null) {
      let token;
      if(req.cookies && req.cookies['token'])
        token = req.cookies['token'];
      //token = localStorage.getItem('token');      
      if(!token){        
        req.app.locals.error = "Not Authenticated!";
        return res.status(401).redirect('auth/login');
      }
      else{
        try{
          token = JSON.parse(token);
          accessToken = token.accessToken;
        }
        catch(err){
          accessToken = '';
        }
      }
    }
    
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, userData) => {      
      if (err) { 
        console.log(err);
        if(req.originalUrl.indexOf('/api') >= 0){
          return res.status(401).send({error: 'Token invalid!'});
        }else{
          if(req.cookies && req.cookies['token'])
            req.cookies['token'] = null;
            res.clearCookie("token");

            if(err.message && err.message.indexOf('expired') >= 0){
              req.app.locals.error = "Session expired!";              
            }
            else{
              req.app.locals.error = err.message;
            }
            return res.status(401).redirect('auth/login');
        }
      }

      res.locals.userData = userData;
      next(); // pass the execution off to whatever request the client intended
    });
  }
  else{
    next();
  }
}


module.exports = authenticateToken;