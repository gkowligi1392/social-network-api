const router = require("express").Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require("../../controllers/thought-controller");

//api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

// /api/thoughts/:userId
router.route("/:thoughtId").get(getThoughtById).put(updateThought);

// /api/thoughts/:userId/:thoughtId
router.route("/:thoughtId/:userId").delete(deleteThought);

//api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction);

//api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;