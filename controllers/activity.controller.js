const db = require("../models");
const Activity = db.activity;

exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(403).send({ message: "Invalid Activity submited" });
    return;
  }

  const activityDb = await Activity.findOne({
    where: { name: req.body.name },
  });

  if (activityDb !== null) {
    res
      .status(201)
      .send({ message: "ACTIVITY EXISTS LOGIN OR SELECT FORGOT PASSWORD" });
    return;
  }

  const activity = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };

  Activity.create(activity)
    .then((data) => {
      res.send(data);
      return;
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "activity cannot be created" });
      return;
    });
};

exports.findAll = async (req, res) => {
  const activities = await Activity.findAll();

  console.log(activities.every((activity) => activity instanceof Activity)); // true
  console.log("All activities:", JSON.stringify(activities, null, 2));
};
exports.findOne = async (req, res) => {
  const activityDb = await Activity.findOne({
    where: { id: req.params.id },
  });

  if (activityDb === null) {
    res.status(500).send({ message: "Activity not found" });
  }
  res.send(user);
};
exports.update = (req, res) => {
  const id = req.params.id;
  Activity.update(req.body, {
    id: id,
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Activity was updated successfully" });
      } else {
        res.send({
          message: `Cannot update Activity with id=${id}. Maybe Activity was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Activity with id=" + id,
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;

  Activity.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Activity was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Activity  with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Activity with id=" + id,
      });
    });
};
