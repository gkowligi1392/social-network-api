const router = require("express").Router();
const {
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
} = require("../../controllers/thought-controller");

// /api/thoughts/:userId
router.route("/:userId").post(createThought);

// /api/thoughts/:userId/:thoughtId
router
    .route("/:userId/:thoughtId")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;