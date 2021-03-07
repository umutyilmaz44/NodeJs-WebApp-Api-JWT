require('dotenv').config();
const jwt = require('jsonwebtoken');

const TokenInfo = require('../models/token-info');
const userService = require('./user.service');
const tokenService = require('./token.service');

async function login(email, password){
    let user;
    try{
        user = await userService.findUser(email, password);
    } catch(error){
        console.log(error);
    }
    
    if(!user) {
        throw 'User not found. Authentication failed.';
    }
    
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    let token;
    try{
     token = await tokenService.addToken(user, refreshToken, accessToken);
    } catch(error){
        token=null;
        console.log(error);
    }
    if(token) {
        const tokenInfo = new TokenInfo(token.access_token, token.refresh_token);
        return tokenInfo;
    } else {
        throw 'Token creation failed. Authentication failed.';
    }
}

async function logout(accessToken, refreshToken){
    try{
        const result = await tokenService.removeToken(refreshToken, accessToken);
    }
    catch(err){
        throw err;
    }
        
    return true;
}

function generateAccessToken(user){
    const userData = {
        uid: user.id,
        fname: user.first_name,
        lname: user.last_name
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
    login,
    logout,
    generateAccessToken,
    generateRefreshToken
};