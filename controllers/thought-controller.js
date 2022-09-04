const { Thought, User } = require("../models");

module.exports = {
    getAllThoughts( req, res ) {
        Thought.find({})
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v")
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getOneThought({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate([
          { path: "reactions", select: "-__v" }
        ])
        .select("-__v")
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res.status(404).json({ message: "No thought found with this id" });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    },
    createThought({ body }, res) {
        Thought.create({
          thoughtText: body.thoughtText,
          username: body.username,
          userId: body.userId,
        })
          .then((dbThoughtData) => {
            User.findOneAndUpdate(
              { _id: body.userId },
              { $push: { thoughts: dbThoughtData._id } },
              { new: true }
            )
              .then((dbUserData) => {
                if (!dbUserData) {
                  res.status(404).json({ message: "No thought found with this id" });
                  return;
                }
                res.json(dbUserData);
              })
              .catch((err) => res.json(err));
          })
          .catch((err) => res.status(400).json(err));
      },
      deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err))
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {
            runValiudators: true,
            new: true,
        })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { runValidators: true, new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    },
    deleteReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    }
}