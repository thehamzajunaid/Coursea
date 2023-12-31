import createError from "../utils/createError.js";
import Enrollment from "../models/enrollment.model.js";
import Course from "../models/course.model.js";
import Stripe from "stripe";

export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);

  const course = await Course.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: course.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newEnrollment = new Enrollment({
    courseId: course._id,
    buyerId: req.userId,
    teacherId: course.teacherId,
    payment_intent: paymentIntent.id,
  });

  await newEnrollment.save();

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};

export const getEnrollments = async (req, res, next) => {
  try {
    const getEnrollments = await Enrollment.find({
      ...(req.isTeacher ? { teacherId: req.userId } : { buyerId: req.userId })
    });

    res.status(200).send(getEnrollments);
  } catch (err) {
    next(err);
  }
};

export const getAlreadyEnrolledInCourse = async (req, res, next) => {
  try {
    const getAlreadyEnrolledInCourse = await Enrollment.find(
      {"buyerId": req.userId, "courseId": req.params.courseId, "paymentComplete": true}
    );

    let status;

    if (getAlreadyEnrolledInCourse.length > 0){
      status = true
    }else {
      status = false
    }
    
    res.status(200).send(status);
  } catch (err) {
    next(err);
  }
};

export const confirm = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          paymentComplete: true,
        },
      }
    );

    const deletePendingEnrollment = await Enrollment.deleteMany( { buyerId: req.body.currentUserId, paymentComplete: false } )

    res.status(200).send("Payment has been confirmed.");
  } catch (err) {
    next(err);
  }
};
