const Order = require("../model/orderModel")
const Gig = require("../model/gigModel")
const { CreateError } = require("../utilis/createError")
const stripe = require("stripe")(process.env.STRIPE);


// const createOrder = async(req,res,next) => {
//     try {
//         const gig = await Gig.findById(req.params.gigId)

//         const newOrder = new Order({
//             gigId: gig._id,
//             img: gig.cover,
//             title: gig.title,
//             buyerId: req.userId,
//             sellerId: gig.userId,
//             price: gig.price,
//             payment_intent: "temporary"
//         })

//         const savedOrder = await newOrder.save()
//         res.status(201).send(savedOrder)

//     } catch (error) {
//         next(error)
//     }
// }

const getOrder = async (req,res,next) => {
    try {
        const orders = await Order.find({
            ...(req.isSeller ?  {sellerId: req.userId} : {buyerId: req.userId}),
            isCompleted: true
        })
        res.status(201).send(orders)
    } catch (error) {
        next(error)
    }
}

const intent = async (req,res,next) => {

    // const stripe = new Stripe(
    //     process.env.STRIPE
    // )

    // const gig = await Gig.findById(req.params.id)

    // // Create a PaymentIntent with the order amount and currency
    // const paymentIntent = await stripe.paymentIntents.create({
    // amount: gig.price * 100,
    // currency: "usd",
    // // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    // automatic_payment_methods: {
    //   enabled: true,
    //  },
    // });

    // const newOrder = new Order({
    //     gigId: gig._id,
    //     img: gig.cover,
    //     title: gig.title,
    //     buyerId: req.userId,
    //     sellerId: gig.userId,
    //     price: gig.price,
    //     payment_intent: paymentIntent.id,
    // })

    // await newOrder.save()

    // res.status(200).send({
    //     clientSecret: paymentIntent.clientSecret,
    // })

//     const stripe = new Stripe(process.env.STRIPE);

  const gig = await Gig.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id,
  });

  await newOrder.save();

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
}

module.exports = {
    // createOrder,
    getOrder,
    intent
}