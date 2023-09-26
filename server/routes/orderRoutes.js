const express = require("express")
const {  verifyToken } = require("../middleware/jwt")
const {  getOrder, intent } = require("../controller/orderController")

const router = express.Router()

// router.post("/:gigId", verifyToken, createOrder)
router.get("/", verifyToken, getOrder)
router.post("/create-payment-intent/:id", verifyToken, intent)

module.exports = router