const router = require("express").Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
} = require("../../controllers/thought-controller");

//api/thoughts
router.route("/").get(getAllThoughts);


// /api/thoughts/:userId
router.route("/:userId").post(createThought);

// /api/thoughts/:userId/:thoughtId
router
    .route("/:userId/:thoughtId")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;