const { User } = require("../models");

const userController = {
    //GET all users
    async getUsers(req, res) {
        const users = await User.find();
        res.send(users);
    },
    //GET user by id
    async getUserById(req, res) {
        const user = await User.findById(req.params.id);
        res.send(user);
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
        const user = await User.findByIdAndDelete(params.id);
        res.json(user);
    },
};

module.exports = userController;