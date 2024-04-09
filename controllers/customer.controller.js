const db = require("../models");
const Customer = db.customer;

exports.create = (req, res) => {
  if (!req.body.username) {
    res.status(400).send({ message: "customer canot be empty" });
    return;
  }
  const customer = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };

  Customer.create(customer)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "customer cannot be created" });
    });
};

exports.findAll = (req, res) => {
  Customer.find;
};
exports.findOne = async (req, res) => {
  const customer = await Customer.findOne({
    where: { username: req.params.username },
  });

  if (customer === null) {
    res.status(500).send({ message: "customer not found" });
  }
  res.send(customer);
};
exports.update = (req, res) => {
  const id = req.params.id;
  Customer.update(req.body, {
    id: id,
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Customer was updated successfully" });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;

  Customer.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Customer was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Customer with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};
