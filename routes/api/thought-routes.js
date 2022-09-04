const router = require("express").Router();

const {
    getAllThoughts,
    createThought,
    getOneThought,
    deleteThought,
    updateThought,
    addReaction,
    deleteReaction,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts).post(createThought);

router.route("/:id").get(getOneThought).delete(deleteThought).put(updateThought);

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;