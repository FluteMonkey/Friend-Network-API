const router = require("express").Router();

const {
    getAllThoughts,
    createThought,
    getOneThought,
    deleteThought,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts).post(createThought);

router.route("/:id").get(getOneThought).delete(deleteThought);

module.exports = router;