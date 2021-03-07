require('dotenv').config();
const jwt = require('jsonwebtoken');

const userService = require('../../services/user.service');
const tokenService = require('../../services/token.service');
const authHelper = require('../../helpers/auth.helper');
const authService = require('../../services/auth.service');

const getToken = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.status(404).send({
            message: 'Username and password can not be empty!',
        });
    } else {
        const username = req.body.username;
        const password = req.body.password;
        authService.login(username, password)
            .then(token =>{
                    console.log(token);
                res.status(200).send({ message: 'success', accessToken: token.accessToken, refreshToken: token.refreshToken});
            })
            .catch(err => {
                console.log(err);
                res.status(403).send({ message: err });
            });
    }
}

const getTokenByRefreshToken = (req, res, next) => {
    if (!req.body.refresh_token) {
        return res.status(401).send({
        message: 'Refresh token can not be empty!',
        });
    } else {
        tokenService.findTokenByRefreshToken(req.body.refresh_token)
        .then(token => {
            if(!token) {
                return res.status(403).send({
                     message: 'fail',
                     error: 'Refresh token not found. Authentication failed.'
                 });
            }

            jwt.verify(token.refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, userData) => {      
                if (err) { 
                  console.log(err);
                  return res.sendStatus(403);
                }
                
                const accessToken = generateAccessToken(userData);

                return res.status(200).send({ message: 'success', accessToken: accessToken });
              });
        })
        .catch((error) => res.status(400).send(error));
    }
}

const deleteToken = (req, res, next) => {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const refreshToken = req.body.refreshToken;
    const accessToken = authHeader && authHeader.split(' ')[1]
    if (!accessToken){ 
      return res.status(401).send({
            message: 'Token can not be empty!',
        }); // if there isn't any token
    }
    if (!refreshToken) {
        return res.status(401).send({
            message: 'Refresh token can not be empty!',
        });
    } 
    else {
        authService.logout(accessToken, refreshToken)
            .then(result =>{
                console.log('logout result: ' + result);    
                res.status(200).send({result: 'Success'});
            })
            .catch(err => {
                console.log('logout error: ' + err);
                res.status(500).send({error: err})
            });    
    }
}


function generateAccessToken(user){
    const userData = {
        uid: user.id,
        uname: user.username
    };

    const options = {
        expiresIn : process.env.ACCESS_TOKEN_LIFE
    };

    const token = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, options );

    return token;
}
function generateRefreshToken(user){
    const userData = {
        uid: user.id,
        uname: user.username
    };

    const options = {
        expiresIn : process.env.REFRESH_TOKEN_LIFE
    };

    const token = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET, options );

    return token;
}

module.exports = {
    getToken,
    getTokenByRefreshToken,
    deleteToken
}