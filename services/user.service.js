const db = require("../repository/db");
//db.sequelize.sync();

const authHelper = require('../helpers/auth.helper');

async function findUser(email, password){
    let user;
    try{
        user = await db.models.user.findAll({ where: { email_address: email, deleted: false } });
        if(user.length > 0)
            user = user[0].dataValues;
    } catch(error){
        return Promise.reject(error.message); 
    }

    if (!user) 
        return Promise.reject('Username or password is incorrect'); 
    
    const match = await authHelper.compareHashedValue(password, user.password);
    if (!match) 
        return Promise.reject('Username or password is incorrect');
    
    return  Promise.resolve(user);
}

async function findById(id){

    let user;
    try{
        user = await db.models.user.findByPk(id);
    } catch(error){
        user = null;
    }
    if (!user) 
        return Promise.reject('User not found!');
    
    return Promise.resolve(user.dataValues);
}

async function getAll() {

    let users;
    try{
        let dataList = await db.models.user.findAll({ where: { deleted: false } });
        users = [];
        dataList.forEach(element => {
            users.push(element.dataValues);
        });
    } catch(error){
        users = null;
    }

    return Promise.resolve(users);
}

async function addUser(user){
    let createdUser;
    let err;
    try{
        createdUser = await db.models.user.create(user);
    } catch(error){
        err = error;
        createdUser = null;
    }

    if (!createdUser) 
        return Promise.reject(err); 
    
    return  Promise.resolve(createdUser);
}

async function updateUser(user, id){
    let effectedCount;
    let err;
    try{
        if(!user || !user.email_address || !user.first_name || !user.last_name){
            return Promise.reject('User info invalid!'); 
        }

        effectedCount = await db.models.user.update(user, {
                            where: {id: id}
                        });
    } catch(error){
        err = error;
        effectedCount = 0;
    }

    if (effectedCount != 1) 
        return Promise.reject(err); 
    
    return  Promise.resolve();
}

async function deleteUser(user, id){
    let effectedCount;
    let err;
    try{
        effectedCount = await db.models.user.destroy({
                            where: {id: id}
                        });
    } catch(error){
        err = error;
        effectedCount = 0;
    }

    if (effectedCount != 1) 
        return Promise.reject(err); 
    
    return  Promise.resolve();
}

async function findByFilter(filter){
    let users;
    try{
        users = await db.models.user.findAll({ where: filter });
    } catch(error){
        return Promise.reject(error.message); 
    }
    
    return  Promise.resolve(users);
}

module.exports = {
    findUser,
    findById,
    getAll,
    addUser,
    updateUser,
    deleteUser,
    findByFilter
};