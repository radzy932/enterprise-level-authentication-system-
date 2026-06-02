const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../config/db");

exports.signup = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role
    } = req.body;

    const existingUser = users.find(
      user => user.email === email
    );

    if (existingUser) {

      return res.status(400).json({
        message: "Email already exists"
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    users.push({
      id: Date.now(),
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      lastLogin: new Date()
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully"
    });

  } catch {

    res.status(500).json({
      message: "Server error"
    });

  }
};

exports.login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user = users.find(
      user => user.email === email
    );

    if (!user) {

      return res.status(400).json({
        message: "User not found"
      });

    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {

      return res.status(400).json({
        message: "Invalid password"
      });

    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      "enterprise_secret_key",
      {
        expiresIn: "1d"
      }
    );

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch {

    res.status(500).json({
      message: "Server error"
    });

  }
};

exports.profile = (req, res) => {

  const users = require("../config/db");

  const user = users.find(
    user => user.email === req.user.email
  );

  res.json(user);
};
