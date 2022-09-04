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
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            runValiudators: true,
            new: true,
        })
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
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { runValidators: true, new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id" });
                return;
            }
            User.findOneAndUpdate(
                { _id: params.friendId },
                { $addToSet: { friends: params.userId } },
                { runValidators: true, new: true }
            )
            .then((dbUserData2) => {
                if (!dbUserData2) {
                    res.status(404).json({ message: "No user found with this id" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
        })
    },
    //same as update except pulll instead of adding to set we pull
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { runValidators: true, new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id" });
                return;
            }
            User.findOneAndUpdate(
                { _id: params.friendId },
                { $pull: { friends: params.userId } },
                { runValidators: true, new: true }
            )
            .then((dbUserData2) => {
                if (!dbUserData2) {
                    res.status(404).json({ message: "No user found with this id" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
        })
    }
}