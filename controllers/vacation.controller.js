const db = require("../models");
const Vacation = db.vacation;
const configs = require("../configs/app.config");

exports.create = async (req, res) => {
  if (!req.body.locationId) {
    res.status(403).send({ message: "Invalid vacation submited" });
    return;
  }

  const vacation = {
    price: req.body.price,
    discount: req.body.discount,
    description: req.body.description,
    fromDate: new Date(req.body.fromDate),
    toDate: new Date(req.body.toDate),
    locationId: req.body.locationId,
  };

  Vacation.create(vacation)
    .then((data) => {
      res.send(data);
      return;
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "vacation cannot be created" });
      return;
    });
};

exports.findAll = (req, res) => {
  Vacation.find;
};
exports.findOne = async (req, res) => {
  const vacation = await Vacation.findOne({
    where: { id: req.params.id },
  });

  if (vacation === null) {
    res.status(500).send({ message: "vacation not found" });
  }
  res.send(user);
};
exports.update = (req, res) => {
  const id = req.params.id;
  Vacation.update(req.body, {
    id: id,
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Vacation was updated successfully" });
      } else {
        res.send({
          message: `Cannot update Vacation with id=${id}. Maybe Vacation was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Vacation with id=" + id,
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;

  Vacation.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Vacation was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Vacation  with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Vacation with id=" + id,
      });
    });
};
