require('dotenv').config();
const axios = require('axios');
const localStorage = require("localStorage");
const systemHelper = require('../helpers/system.helper');
const authService = require('../services/auth.service');
const TokenInfo = require('../models/token-info');

const loginView = (req, res, next) => {
    let err = req.app.locals.error;
    req.app.locals.error = null;
    res.render('auth/login', { layout: 'layouts/out-layout', error: err });
};

const loginPost =  (req, res, next) => {
    req.app.locals.error = null;
    
    var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
        const host = process.env.APP_HOST || 'http://localhost';
        const port = systemHelper.normalizePort(process.env.APP_PORT || '3000');
        let url = `${host}:${port}/api/auth/token`;
        console.log('url => ' + url);  

        //#region Logout Code With Callinp Web API Method
        var data = JSON.stringify({
            "username":username,
            "password":password
        });

        var config = {
            method: 'post',
            url: `${host}:${port}/api/auth/token`,
            headers: { 
                'Content-Type': 'application/json', 
                'Accept': 'text/plain'
            },
            data : data
        };

        axios(config)
        .then(function (response) {
            console.log('login result: ' + response);  
            let token = new TokenInfo(response.data.accessToken, response.data.refreshToken);
            res.cookie("token", JSON.stringify(token), { httpOnly: true});
            res.status(200).redirect('/');
        })
        .catch(function (err) {
            console.log('login error: ');
            console.log(err);

            req.cookies['token']=null;
            res.status(403).render('auth/login', { layout: 'layouts/out-layout', error: err.response.data.message });
        });
        //#endregion

        //#region Logout Code With Calling Service Method
        // authService.login(username, password)
        //     .then(token =>{
        //         console.log(token);
        //         res.cookie("token", JSON.stringify(token), { httpOnly: true});
        //         //localStorage.setItem('token', JSON.stringify(token));                
        //         res.status(200).redirect('/');
        //     })
        //     .catch(err => {
        //         console.log('logout error: ' + err);
        //         req.cookies['token']=null;
        //         res.cookie.token=null;
        //         //localStorage.removeItem("token");
        //         res.status(403).render('auth/login', { layout: 'layouts/out-layout', error: err });
        //     });
        //#endregion
    } 
    else {
        res.status(403).render('auth/login', { layout: 'layouts/out-layout', error: 'Please enter Username and Password!'});
	}
};

const logoutPost =  (req, res, next) => {
    let token;
    let accessToken, refreshToken;
    if(req.cookies && req.cookies['token']){
        token = req.cookies['token'];

        try{
            token = JSON.parse(token);
            accessToken = token.accessToken;
            refreshToken = token.refreshToken;
        }
        catch(err){
            accessToken = null;
            refreshToken = null;
        }
    }
    if (accessToken && refreshToken) { 
        const host = process.env.APP_HOST || 'http://localhost';
        const port = systemHelper.normalizePort(process.env.APP_PORT || '3000');
        let url = `${host}:${port}/api/auth/logout`;

        //#region Logout Code With Callinp Web API Method
        var data = JSON.stringify({
            'refreshToken': refreshToken
        });

        var config = {
            method: 'post',
            url: `${host}:${port}/api/auth/logout`,
            headers: { 
                'Content-Type': 'application/json', 
                'Accept': 'text/plain',
                'Authorization': `Bearer ${accessToken}` 
            },
            data : data
        };

        axios(config)
        .then(function (response) {
            console.log('logout result:');
            console.log(response);  
            res.clearCookie("token");     
            res.status(200).send({result: 'Success'});
        })
        .catch(function (err) {
            console.log('logout error: ' + err);
            res.status(500).send({error: err})
        });
        //#endregion

        //#region Logout Code With Calling Service Method
        // authService.logout(accessToken, refreshToken)
        //     .then(result =>{
        //         console.log('logout result: ' + result);                    
        //         res.clearCookie("token");       
        //         res.status(200).send({result: 'Success'});
        //     })
        //     .catch(err => {
        //         console.log('logout error: ' + err);
        //         res.status(500).send({error: err})
        //     });    
        //#endregion
    }
    else{
        res.status(500).send({ error: "Token not found!" });
    }
};

const registerView = (req, res, next) => {
    res.render('auth/register', { layout: 'layouts/out-layout' });
};

const registerPost = (req, res, next) => {
    
    next();
};

module.exports = {
    loginView,
    loginPost,
    logoutPost,
    registerView,
    registerPost
}