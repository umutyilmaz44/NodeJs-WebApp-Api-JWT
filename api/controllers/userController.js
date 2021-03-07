require('dotenv').config();
const jwt = require('jsonwebtoken');

const userService = require('../../services/user.service');
const authHelper = require('../../helpers/auth.helper');

const findById = (req, res, next) => {
    if (!req.params.id) {
        return res.status(404).send({
        message: 'User id can not be empty!',
        });
    } else {
        userService.findById(req.params.id)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                     message: 'fail',
                     error: 'User not found. Authentication failed.'
                 });
            }
            user.password=null;
            return res.status(200).send({ message: 'Success', user: user});
        })
        .catch((error) => {
            res.status(400).send(error)
        });
    }
}

const getUsers = (req, res, next) => {
    userService.getAll()
        .then(datalist => {
            if(!datalist) {
                return res.status(404).send({
                     message: 'fail',
                     error: 'User not found. Authentication failed.'
                 });
            }
            let users=[];
            datalist.forEach(function(user) {
                user = {id: user.id, firstName: user.first_name, lastName: user.last_name, email: user.email_address};
                users.push(user);
            });
            
            return res.status(200).send({data: users});
        })
        .catch((error) => {
            res.status(400).send(error)
        });
}

const deleteUser = (req, res, next) => {
    if (!req.params.id) {
        return res.status(404).send({
        message: 'User id can not be empty!',
        });
    } else {
        userService.findById(req.params.id)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                     message: 'fail',
                     error: 'User not found.'
                 });
            } else{
                userService.deleteUser(user, req.params.id)
                    .then(result => {
                        return res.status(200).send({ message: 'Success' });
                    })
                    .catch((error) => {
                        res.status(400).send(error)
                    });
            }
            return res.status(200).send({ message: 'Success' });
        })
        .catch((error) => {
            res.status(400).send(error)
        });
    }
}

const updateUser = (req, res, next) => {
    if (!req.params.id) {
        return res.status(404).send({
        message: 'User id can not be empty!',
        });
    } 
    if (!req.body.userProfile) {
        return res.status(401).send({
        message: 'User info can not be empty!',
        });
    } else {
        userService.findById(req.params.id)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                     message: 'fail',
                     error: 'User not found. Authentication failed.'
                 });
            }
            user.first_name=req.body.userProfile.firstName;
            user.last_name=req.body.userProfile.lastName;
            user.email_address=req.body.userProfile.email;
            userService.updateUser(user, req.params.id)
            .then(result => {
                return res.status(200).send({ message: 'Success'});
            })
            .catch((error) => {
                res.status(400).send(error)
            });            
        })
        .catch((error) => {
            res.status(400).send(error)
        });
    }
}

const addUser = (req, res, next) => {
    if (!req.body.userProfile) {
        return res.status(401).send({
        message: 'User info can not be empty!',
        });
    } else {
        userService.findByFilter({email_address: req.body.userProfile.email, deleted: false})
        .then(async users => {
            if(users && users.length > 0) {
                return res.status(404).send({
                     message: 'fail',
                     error: 'User email already exist.'
                 });
            }
            let user = {}
            user.first_name=req.body.userProfile.firstName;
            user.last_name=req.body.userProfile.lastName;
            user.email_address=req.body.userProfile.email;

            let hashedPassword = await authHelper.getHashedValue(req.body.userProfile.password);
            user.password = hashedPassword;
            
            userService.addUser(user)
            .then(result => {
                return res.status(200).send({ message: 'Success'});
            })
            .catch((error) => {
                res.status(400).send(error)
            });            
        })
        .catch((error) => {
            res.status(400).send(error)
        });
    }
}

const updatePassword = (req, res, next) => {
    if (!req.params.id) {
        return res.status(404).send({
            message: 'User id can not be empty!',
        });
    } 
    if (!req.body.pswData || !req.body.pswData.password || !req.body.pswData.newPassword) {
        return res.status(401).send({
            message: 'Password info can not be empty!',
        });
    } else {
        userService.findById(req.params.id)
        .then(async user => {
            if(!user) {
                return res.status(404).send({
                     message: 'fail',
                     error: 'User not found. Authentication failed.'
                 });
            }
            const match = await authHelper.compareHashedValue(req.body.pswData.password, user.password)
            if (!match) {
                return res.status(404).send('Password wrong!');
            } else{
                let hashedPassword = await authHelper.getHashedValue(req.body.pswData.newPassword);
                user.password = hashedPassword;
                userService.updateUser(user, req.params.id)
                .then(result => {
                    res.status(200).send({ message: 'Success'});
                })
                .catch((error) => {
                    res.status(400).send(error)
                }); 
            }                    
        })
        .catch((error) => {
            res.status(400).send(error)
        });
    }
}

module.exports = {
    findById,
    getUsers,    
    deleteUser,
    updateUser,
    addUser,
    updatePassword
}