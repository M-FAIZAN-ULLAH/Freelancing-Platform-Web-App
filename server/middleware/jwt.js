const jwt = require("jsonwebtoken");
const { CreateError } = require("../utilis/createError")

const verifyToken = (req, res, next) => {
  
  const token = req.cookies.accessToken;
  if (!token) return next(CreateError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    
    if (err) return next(CreateError(403, "Token is not valid!"));
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    
    next();
  });
};

module.exports = {
  verifyToken,
};
