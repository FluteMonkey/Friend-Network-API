const { User } = require("../models");

module.exports = {
    getAllUsers(req, res) {
        User.find({})
        .select("-__v")
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    findOneUser({ params }, res) {
        User.findOne({ _id: params.id })
        .populate([
          { path: "thoughts", select: "-__v" },
          { path: "friends", select: "-__v" },
        ])
        .select("-__v")
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    },
    createUser({ body }, res) {
        User.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.json(err));
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.json(err))
    }
}