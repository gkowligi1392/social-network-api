const router = require("express").Router();
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require("../../controllers/user-controller");

//API /api/users
router.route("/").get(getUsers).post(createUser);
//API /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

//API /api/users/:userId/friends
router.route("/:userId/friends").post(addFriend);
//API /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").delete(removeFriend);

module.exports = router;