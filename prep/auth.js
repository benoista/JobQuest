
const jwt = require('jsonwebtoken');

const secretKey = process.env.DB_HOST;
function decodeToken(token){
    return jwt.decode(token, secretKey);
}

function isAdmin(token){
    const decoded = decodeToken(token);
    return decoded.isAdmin === true;
}

function isUser(token){
    const decoded = decodeToken(token);
    return decoded.isAdmin === false;
}

function getUserId(token){
    const decoded = decodeToken(token);
    return decoded.userId;
}

module.exports = {isAdmin, isUser, getUserId};