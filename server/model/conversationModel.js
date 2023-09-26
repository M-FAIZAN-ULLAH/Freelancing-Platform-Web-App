const mongoose = require('mongoose');
const { Schema } = mongoose

const ConversationSchema = new Schema({
    id: {
        type: String,
        unique: true,
        require: true
    },
    sellerId: {
        type: String,
        require: true
    }, 
    buyerId: {
        type: String,
        require: true
    },
    readBySeller: {
        type: Boolean,
        require: true
    },
    readByBuyer: {
        type: Boolean,
        require: true
    },
    lastMessage: {
        type: String,
        require: false
    },  
},{
    timestamps: true
})

module.exports = mongoose.model("Conversation", ConversationSchema)