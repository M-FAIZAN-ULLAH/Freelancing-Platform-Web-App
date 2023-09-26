const Conversation = require("../model/conversationModel")
const CreateError = require("../utilis/createError")

const getConversation = async(req,res,next) => {
    try {
        const conversation = await Conversation.find(
            req.isSeller ? {sellerId: req.userId} : {buyerId: req.userId}
        )
        res.status(201).send(conversation)
    } catch (error) {
        next(error)
    }
}

const getSingleConversation = async(req,res,next) => {
    try {
        const conversation = await Conversation.findOne({id: req.params.id})
        if(!conversation) return next(CreateError(404,"Not found"))
        res.status(201).send(conversation)
    } catch (error) {
        next(error)
    }
}

const createConversation = async(req,res,next) => {
    const newConversation = new Conversation({
        id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
        sellerId: req.isSeller ? req.userId : req.body.to,
        buyerId: req.isSeller ? req.body.to : req.userId,
        readBySeller: req.isSeller,
        readByBuyer: !req.isSeller,

    })    

    try {
        const savedConversation = await newConversation.save()
        res.status(201).send(savedConversation)
    } catch (error) {
        next(error)
    }
}

const updateConversation = async(req,res,next) => {
    const updatedConversation = await Conversation.findOneAndUpdate(
        { id: req.params.id },
        {
            $set: {
                // readBySeller: req.isSeller,
                // readByBuyer: !req.isSeller
                ...(req.isSeller ? {readBySeller: true} : {readByBuyer: true})
            },
        },
        { new: true }
    )

    try {
        res.status(201).send(updatedConversation)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getConversation,
    getSingleConversation,
    createConversation,
    updateConversation
}