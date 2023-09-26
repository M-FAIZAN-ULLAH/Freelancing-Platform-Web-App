const express = require("express")
const { verifyToken } = require("../middleware/jwt")
const { getConversation, getSingleConversation, createConversation, updateConversation } = require("../controller/conservationController")

const router = express.Router()

router.get("/",verifyToken, getConversation)
router.post("/", verifyToken, createConversation)
router.get("/single/:id", verifyToken, getSingleConversation)
router.put("/:id",verifyToken, updateConversation)

module.exports = router