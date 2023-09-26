const express = require("express")
const { verifyToken } = require("../middleware/jwt")
const { createGig, deleteGig, getGig, getGigs } = require("../controller/gigController")

const router = express.Router()

router.post("/", verifyToken, createGig)
router.delete("/:id", verifyToken, deleteGig)
router.get("/single/:id",  getGig)
router.get("/", getGigs)

module.exports = router