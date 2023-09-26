const Review = require("../model/reviewModel")
const Gig = require("../model/gigModel")
const { CreateError } = require("../utilis/createError")

const createReview = async (req,res,next) => {
    if (req.isSeller)
    return next(createError(403, "Sellers can't create a review!"));

  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });

    if (review)
      return next(
        CreateError(403, "You have already created a review for this gig!")
      );

    //TODO: check if the user purchased the gig.

    const savedReview = await newReview.save();

    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
}

const getReviews = async (req,res,next) => {
    try {
        const reviews = await Review.find({ gigId: req.params.id });
        res.status(200).send(reviews);
      } catch (err) {
        next(err);
      }
}

const deleteReview = async (req,res,next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createReview,
    getReviews,
    deleteReview
}