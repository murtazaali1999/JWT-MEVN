const jwt = require("jsonwebtoken");

module.exports = {
    verifyJsonWebToken: (req, res, next) => {
        const bearerHeader = req.cookies.Bearer

        if (typeof bearerHeader !== "undefined") { //if bearer is not undefined

            const bearerToken = bearerHeader.split(" ");
            //now token is split into bearer and XI3R2WEFJ2, get the 2nd part/[1]

            const token = bearerToken[1];

            req.token = token; //set req.token to token, that can be accessed in the controller

            next();//to next middleware
        } else {
            res.status(403).clearCookie("Bearer").json({ message: "TOKEN NOT FOUND" });
            //this will clear the cookie stored named token on the client
        }
    }
}