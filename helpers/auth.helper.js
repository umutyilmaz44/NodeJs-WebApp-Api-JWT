const bcrypt = require('bcrypt');
const saltRounds = 10;

const getHashedValue = async function (value){
    try{
        const hash = await bcrypt.hash(value, saltRounds);
        return hash;
    }
    catch(err){
        return null;
    }
}

const compareHashedValue = async function (value, hashedValue){
    try{
        const match = await bcrypt.compare(value, hashedValue);
        return match;
    }
    catch(err){
        return null;
    }
} 

module.exports = {
    getHashedValue,
    compareHashedValue
}