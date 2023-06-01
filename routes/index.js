const userRouter = require("./userRoute");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("<h1>Selamat Datang!</h1>");
});

router.use(userRouter);

module.exports = router;