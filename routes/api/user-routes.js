const router = require("express").Router();
const {
    getAllUsers,
    createUser,
    findOneUser,
} = require("../../controllers/user-controller");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(findOneUser);

module.exports = router;