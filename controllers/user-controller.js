const { User, Thought } = require("../models");

const userController = {
    //GET all users
    async getUsers(req, res) {
        try {
            const users = await User.find({})
                .populate({
                path: "thoughts",
                select: "-__v",
                })
                .select("-__v")
                .sort({ _id: -1 })
                .populate({
                path: "friends",
                select: "-__v",
                })
                .select("-__v")
                .sort({ _id: -1 });
            res.send(users);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Error getting users",
                error: err,
            });
        }
    },
    //GET user by id
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id)
                .populate({
                path: "thoughts",
                select: "-__v",
                })
                .select("-__v")
                .sort({ _id: -1 });
            res.send(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Error getting user",
                error: err,
            });
        }
    },
    //POST new user
    async createUser({ body }, res) {
        try {
            const user = await User.create(body);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    //PUT user by id
    async updateUser({ params, body }, res) {
        const user = await User.findByIdAndUpdate(params.id, body, {
            new: true,
        });
        res.json(user);
    },
    //DELETE user by id
    async deleteUser({ params }, res) {
        try {
            const user = await User.findByIdAndDelete(params.id);

            //remove thoughts from user
            await Thought.deleteMany({
                _id: { $in: user.thoughts },
            });

            res.json({ user });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Error deleting user",
                error: err,
            });
        }
    },
    //Add Friend to a user
    async addFriend({ params, body }, res) {
        try {
            const { userId } = params;

            const user = await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { friends: body.friendId } },
                { new: true }
            );

            res.json({
                message: "Friend added successfully",
                user,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error adding friend",
                error,
            });
        }
    },
    //Remove Friend from an user
    async removeFriend({ params }, res) {
        try {
            const { userId, friendId } = params;

            const user = await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { friends: friendId } },
                { new: true }
            );

            res.json({
                message: "Friend removed successfully",
                user,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error removing friend",
                error,
            });
        }
    },
};

module.exports = userController;