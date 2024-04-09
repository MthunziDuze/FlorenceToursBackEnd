const db = require("../models");
const User = db.user;
const configs = require("../configs/app.config");

const crypto = require("crypto");

exports.create = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(403).send({ message: "Invalid user submited" });
    return;
  }

  const userdb = await User.findOne({
    where: { username: req.body.username },
  });

  if (userdb !== null) {
    res
      .status(201)
      .send({ message: "USER EXISTS LOGIN OR SELECT FORGOT PASSWORD" });
    return;
  }

  const user = {
    password: encrptPasswod(req.body.password, configs.JWT_SECRET_KEY),
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    usertype: "ADMIN",
    logintype: req.body.logintype,
  };

  User.create(user)
    .then((data) => {
      res.send(data);
      return;
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "user cannot be created" });
      return;
    });
};

function encrptPasswod(password, secret) {
  try {
    // Implementing pbkdf2Sync
    encrpted_key = crypto.pbkdf2Sync(password, secret, 100000, 100, "sha512");
    return encrpted_key.toString("hex");
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error generating password please try again later" });
    return;
  }
}

exports.findAll = (req, res) => {
  User.find;
};
exports.findOne = async (req, res) => {
  const user = await User.findOne({
    where: { username: req.params.username },
  });

  if (user === null) {
    res.status(500).send({ message: "user not found" });
  }
  res.send(user);
};
exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    id: id,
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "User was updated successfully" });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User  with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};
