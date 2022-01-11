const router = require("express").Router();
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require("../../controllers/user-controller");

//API /api/users
router.route("/").get(getUsers).post(createUser);

//API /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;