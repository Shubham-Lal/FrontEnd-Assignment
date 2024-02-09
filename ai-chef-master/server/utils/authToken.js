const jwt = require("jsonwebtoken");

exports.authToken = (payload, expired) => {
    return jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: expired,
    });
};