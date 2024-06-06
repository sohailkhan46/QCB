const review_model = require("../models/review");
const user_model = require("../models/user");

const giveReview=async(req ,res)=>{
       const {rating , description} = req.body;
      try {
           const userId = req.extractedUserId;

           const user = await user_model.findById(userId);
           if(!user){
             return res.status(400).json({message : "No such user exists"});
           }

           const review = new review_model({rating, description , creator : userId });
           review.save();
           return res.status(201).json({message : "Review added successfully"});


      } catch (error) {
        return res.status(500).json({message: error.message});
      }
};

const getAllReviews=async(req ,res)=>{
    try {
          const reviews = await review_model.find({}).populate({path : "creator" , select : "id first_name last_name profile_pic"});
          return res.status(200).json({reviews});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

module.exports = {giveReview , getAllReviews};