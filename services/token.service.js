const db = require("../repository/db");
//db.sequelize.sync();

const jwt = require('jsonwebtoken');

async function findTokenByRefreshToken(refreshToken){

    let token;
    try{
        token = await db.models.user_token.findAll({ where: { refresh_token: refreshToken } })[0];
    } catch(error){
        token = null;
    }

    if (!token) 
        throw 'Refresh token not found!';
    else if(token.is_logout)
        throw 'Refresh token expired!';
    
    return token;
}

const addToken = async function (user, refreshToken, accessToken){

    let decodedRefreshToken = jwt.decode(refreshToken, { complete: true });
    
    const expiryDate = new Date(0);
    expiryDate.setUTCSeconds(decodedRefreshToken.payload.exp);
    const user_token = {
        user_id: user.id,
        access_token: accessToken,
        refresh_token: refreshToken,
        expiry_date: expiryDate,
        is_logout: false,
        login_time: Date.now()
    };

    let err;
    let userToken;
    try{
        userToken = await db.models.user_token.create(user_token);
    } catch(error){
        err = error;
        userToken = null;
    }
    
    if (!userToken) 
        return Promise.reject(err); 
    
    return  Promise.resolve(userToken);
}

async function removeToken(refreshToken, accessToken){
    
    let userToken;
    try{
        userToken = await db.models.user_token.findAll({ where: { refresh_token: refreshToken, access_token: accessToken, is_logout: false } })[0];
    } catch(error){
        userToken = null;
    }

    if (!userToken) 
        Promise.reject('User token not found!'); 
    
    return Promise.resolve();
}

module.exports = {
    findTokenByRefreshToken,
    addToken,
    removeToken
};