const User = require("../model/userModel")
const { CreateError } = require("../utilis/createError")

const deleteUser = async (req,res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return next(CreateError(404, "User not found"))
        }

        if(req.userId !== user._id.toString()){
            return next(CreateError(403, "You can delete only your account"))
        }
    
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send("Deleted!")
    
    } catch (error) {
        res.send(error)
    }

}

const getUser = async(req,res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).send(user)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    deleteUser,
    getUser
}