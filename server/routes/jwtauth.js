const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middlewares/validinfo");
const authorization = require("../middlewares/authorization");

// Register Route
router.post("/register", validInfo, async (req, res) => {
  try {
    // Destructre From Body
    const { name, email, password } = req.body;

    //Check For existing User
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length > 0) {
      return res.status(401).json("User Already Exists !");
    }

    // Bcrypt Password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // Save User In databse
    const newUser = await pool.query(
      "INSERT INTO users (user_name,user_email,user_password) Values($1,$2,$3) returning * ",
      [name, email, bcryptPassword]
    );

    // Create JWT Token
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Login Route
router.post("/login", validInfo, async (req, res) => {
  // 1. Destructre req.body
  const { email, password } = req.body;

  // 2. Check for Existing User
  const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
    email,
  ]);
  if (user.rows.length === 0) {
    return res.status(401).json("Email or Password is Incorrect");
  }
  // 3. Compare Password

  const validPassword = await bcrypt.compare(
    password,
    user.rows[0].user_password
  );

  if (!validPassword) {
    return res.status(401).json("Email or Password is Incorrect");
  }
  // 4, Generate JWT
  const token = jwtGenerator(user.rows[0].user_id);
  res.json({ token });
});

// Verify User
router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
