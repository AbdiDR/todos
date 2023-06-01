const jwtHelper = require("../helper/jwtHelper");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
      const token = req.headers["token"];
  
      if (!token) {
        return res.status(401).json({
          message: "Header token kosong!",
        });
      }
  
      const data = jwtHelper.verify(token);
  
      if (!data.id) {
        return res.status(401).json({
          message: "Id invalid!",
        });
      }
  
      req.user = {
        id: data.id,
      };
  
      next();
    } catch (error) {
      return res.status(401).json({
        message: "unauthorized!",
      });
    }
  };


module.exports = authMiddleware;