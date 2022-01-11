const { User, Thought } = require("../models");

const thoughtController = {
    //Get Thought by ID
    async getThoughtById({ params }, res) {
        try {
            const { thoughtId } = params;
            const dbThought = await Thought.findById(thoughtId);
            if (!dbThought) {
                return res.status(404).json({ message: "Thought not found" });
            }
            res.json(dbThought);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error getting thought" });
        }
    },
    //POST Create Thought
    async createThought({ params, body }, res) {
        try {
            const { userId } = params;
            //create thought
            const thought = await Thought.create(body);
            console.log("New Thought", thought);

            //find the user and add the thought to the user's thoughts array
            const dbUser = await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );
            if (!dbUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(dbUser);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error creating thought" });
        }
    },
    //Update Thought
    async updateThought({ params, body }, res) {
        try {
            const { thoughtId } = params;
            const dbThought = await Thought.findOneAndUpdate(
                { _id: thoughtId },
                body,
                { new: true }
            );
            if (!dbThought) {
                return res.status(404).json({ message: "Thought not found" });
            }
            res.json(dbThought);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error updating thought" });
        }
    },
    //Delete Thought
    async deleteThought({ params }, res) {
        try {
            const { thoughtId, userId } = params;
            const dbThought = await Thought.findOneAndDelete({ _id: thoughtId });
            if (!dbThought) {
                return res.status(404).json({ message: "Thought not found" });
            }
            //TODO: remove thought from user's thoughts array
            const dbUser = await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { thoughts: thoughtId } },
                { new: true }
            );
            if (!dbUser) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json(dbThought);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error deleting thought" });
        }
    },
};

module.exports = thoughtController;