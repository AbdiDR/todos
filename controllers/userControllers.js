const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwtHelper = require("../helper/jwtHelper");

// Configure MySQL connection
const dbConfig = {
  host: "34.143.248.199",
  user: "root",
  password: "",
  database: "todos",
};

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL database " + dbConfig.database);
});

// Middleware to parse request bodies

const userController = {
  addUser: async (req, res, next) => {
    try {
      // ambil body
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(404).json({
          message: "Tolong isi semua input!",
        });
      }
      const hashPassword = await bcrypt.hash(password, 10);

      const sql = "INSERT INTO users (email, password) values (?, ?)";

      connection.query(sql, [email, hashPassword], (err, result) => {
        if (err) {
          res.status(500).send({ message: err.sqlMessage });
        }
        res.send({ message: "Insert Successful" });
      });
    } catch (error) {
      console.log("error:", error);
    }
  },
  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Tolong isi semua input!",
        });
      }

      const sql = "SELECT * FROM users WHERE email = ?";

      connection.query(sql, [email], (err, result) => {
        if (err) {
          res.status(500).send({ message: err.sqlMessage });
        }
        if (result.length === 0) {
          return res.status(401).json({ message: "Invalid username or password" });
        }

        const user = result[0];

        const comparePassword = bcrypt.compare(password, user.password);

        if (!comparePassword) {
          return res.status(400).json({
            message: "Password salah!",
          });
        }

        const token = jwtHelper.signIn({
          id: user.id,
        });

        return res.status(200).json({
          message: "Berhasil Login!",
          token,
        });
      });
    } catch (error) {
      console.log("error:", error);
    }
  },
};

module.exports = userController;
