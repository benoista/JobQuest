
const jwt = require('jsonwebtoken');

const secretKey = process.env.DB_HOST;
function decodeToken(token){
    return jwt.decode(token, secretKey);
}

function isUserAdmin(token){
    const decoded = decodeToken(token);
    console.log(decoded);
    return decoded.isAdmin;
}

function authorizeAdmin(req) {
    const token = req.cookies["token"];
    if (token === "" || token === undefined){
        return false;
    }
    return isUserAdmin(token);
}


function getUserId(token){
    const decoded = decodeToken(token);
    return decoded.userId;
}

module.exports = {getUserId, authorizeAdmin};