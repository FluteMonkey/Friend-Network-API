const router = require("express").Router();
const {
    getAllUsers,
    createUser,
    findOneUser,
    deleteUser,
} = require("../../controllers/user-controller");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(findOneUser).delete(deleteUser);

module.exports = router;