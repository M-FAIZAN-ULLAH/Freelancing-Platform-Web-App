const express = require("express")
const { verifyToken } = require("../middleware/jwt")
const { createMessage, getMessages } = require("../controller/messageController")

const router = express.Router()

router.post("/", verifyToken,createMessage)
router.get("/:id", getMessages)

module.exports = router