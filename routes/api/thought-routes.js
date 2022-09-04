const router = require("express").Router();

const {
    getAllThoughts,
    createThought,
    getOneThought,
    deleteThought,
    updateThought,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts).post(createThought);

router.route("/:id").get(getOneThought).delete(deleteThought).put(updateThought);

module.exports = router;