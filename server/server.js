const express = require("express")
require("dotenv").config()
const cors = require("cors")
const Mongo_connection = require("./db/dbConnection")
const CookieParser = require("cookie-parser")

const authRoutes = require("./routes/authRoute")
const userRoutes = require("./routes/userroutes")
const reviewRoutes = require("./routes/reviewRoutes")
const orderRoutes = require("./routes/orderRoutes")
const messageRoutes = require("./routes/messageRoutes")
const gigRoutes = require("./routes/gigRoutes")
const conservationRoutes = require("./routes/conversationRoutes")


const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(express.json())
app.use(CookieParser())

// app.use((req, res, next) => {
//     res.setHeader("Content-Security-Policy", "frame-src 'self' http://localhost:3000");
//     next();
//   });
   


const port = process.env.PORT

app.use("/api/users", userRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/gigs", gigRoutes)
app.use("/api/conversations", conservationRoutes)
app.use("/api/auth", authRoutes)

app.use((err, req, res, next) => {
    const errStatus = err.status || 500
    const errMessage = err.message || "Something went wrong"
    
    return res.status(errStatus).send(errMessage)
})

app.listen(port, () => { 
    Mongo_connection()  
    console.log(`server is running on port ${port}`)
})