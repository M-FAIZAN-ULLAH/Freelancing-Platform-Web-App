const Message = require("../model/messageModel")
const Conversation = require("../model/conversationModel")
const CreateError = require("../utilis/createError")

const createMessage = async (req,res,next) => {
    const newMessagge = new Message({
        conversationId: req.body.conversationId,
        userId: req.userId,
        desc: req.body.desc
    })
    try {
        const savedMessage = await newMessagge.save()
        await Conversation.findOneAndUpdate(
            { id: req.body.conversationId },
            {
                $set: {
                    readBySeller: req.isSeller,
                    readByBuyer: !req.isSeller,
                    lastMessage: req.body.desc,
                },
            },
            { new: true }
        )
        res.status(201).send(savedMessage)
    } catch (error) {
        next(error)
    }
}

const getMessages = async (req,res,next) => {
    const messages = await Message.find({conversationId: req.params.id})
    try {
        res.status(201).send(messages)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createMessage,
    getMessages
}