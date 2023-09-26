const mongoose = require('mongoose');
const { Schema } = mongoose

const MessageSchema = new Schema({
    conversationId: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
},{
    timestamps: true
})

module.exports = mongoose.model("Message", MessageSchema)