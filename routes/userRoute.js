const userController = require("../controllers/userControllers");
const authMiddleware = require("../middleware/index");
const userRouter = require("express").Router();

userRouter.post("/login", userController.loginUser);
userRouter.post("/register", userController.addUser);

module.exports = userRouter;