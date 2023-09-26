const express = require("express")
const { deleteUser, getUser } = require("../controller/usercontroller")
const { verifyToken } = require("../middleware/jwt")

const router = express.Router()

router.delete("/:id", verifyToken, deleteUser)
router.get("/:id", getUser)

module.exports = router