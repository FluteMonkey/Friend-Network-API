const router = require("express").Router();
const {
    getAllUsers,
    createUser,
    findOneUser,
    deleteUser,
    updateUser,
} = require("../../controllers/user-controller");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(findOneUser).delete(deleteUser).put(updateUser);

module.exports = router;