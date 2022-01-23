const pool = require("../db");
const authorization = require("../middlewares/authorization");

const router = require("express").Router();

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (error) {
    return res.status(500).json("Server Error");
  }
});
module.exports = router;
