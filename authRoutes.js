const express = require("express");

const {
  signup,
  login,
  profile
} = require("../controllers/authController");

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get(
  "/profile",
  authMiddleware,
  profile
);

router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {

    res.json({
      message:
        "Welcome Admin"
    });

  }
);

module.exports = router;
