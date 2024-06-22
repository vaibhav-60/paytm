const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

function authMiddleware(req, res, next) {
    const authHeader = req.header.authorization;

    if( !authHeader || !authHeader.startswith("Bearer ")) {
        return res.status(403).json({
            "message": "authorization header is not found"
        })
    }

    const token = authHeader.split(" ")[1];

   try {
    const decodeToken = jwt.verify(token, JWT_SECRET);

    req.userId = decodeToken.userId
   } catch (error) {
    res.json({
        "message": error
    })
   }

}

module.exports = {
    authMiddleware,
}