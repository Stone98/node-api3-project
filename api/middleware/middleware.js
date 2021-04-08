const e = require("express");
const Users = require("../users/users-model");

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );

  next();
}

const validateUserId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const user = await Users.getById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  if (!name || !name.trim()) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    req.name = name.trim();
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text || !req.body.text.trim()) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
