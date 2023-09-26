const express = require("express")
const { verifyToken } = require("../middleware/jwt")
const { createReview, getReviews, deleteReview } = require("../controller/reviewController")

const router = express.Router()

router.post("/", verifyToken , createReview)
router.get("/:id", getReviews)
router.delete("/:id", deleteReview)

module.exports = router