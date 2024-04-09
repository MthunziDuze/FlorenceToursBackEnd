const db = require("../models");
const Location = db.location;
const configs = require("../configs/app.config");

exports.create = async (req, res) => {
  if (!req.body.placename) {
    res.status(403).send({ message: "Invalid Location submited" });
    return;
  }

  const locationdb = await Location.findOne({
    where: { placename: req.body.placename },
  });

  if (locationdb !== null) {
    res
      .status(201)
      .send({ message: "LOCATION EXISTS LOGIN OR SELECT FORGOT PASSWORD" });
    return;
  }

  const location = {
    country: req.body.country,
    province: req.body.province,
    city: req.body.city,
    placename: req.body.placename,
  };

  Location.create(location)
    .then((data) => {
      res.send(data);
      return;
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "location cannot be created" });
      return;
    });
};

exports.findAll = async (req, res) => {
  const locations = await Location.findAll();
  const locationsa = new Array();
  locations.forEach((location) => {
    locationsa.push(location);
  });
  res.send(JSON.stringify(locationsa));
};
exports.findOne = async (req, res) => {
  const location = await Location.findOne({
    where: { id: req.params.id },
  });

  if (location === null) {
    res.status(500).send({ message: "location not found" });
  }
  res.send(location);
};
exports.update = (req, res) => {
  const id = req.params.id;
  Location.update(req.body, {
    id: id,
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "location was updated successfully" });
      } else {
        res.send({
          message: `Cannot update Location with id=${id}. Maybe Location was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Location with id=" + id,
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;

  Location.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Location was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Location  with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Location with id=" + id,
      });
    });
};
