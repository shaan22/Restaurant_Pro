//Libraries
import express from "express";


//Database Model
import { ReviewModel } from "../../database/allModels";

//VAlidate
import { validateRating, validateReviewText } from "../../validation/review";
import { ValidateRestaurantId } from "../../validation/common";

const Router = express.Router();

/**
 * Router           /new
 * Des              Adding a new Route
 * Params           _id
 * Access           Public
 * Method           POST
 */
Router.get("/:_id",async(req,res) => {
    try{
        await ValidateRestaurantId(req.params);
        const {_id} = req.params;
        const reviews = await ReviewModel.find({restaurants : _id});
        return res.json({reviews});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
    
});

/**
 * Router           /new
 * Des              POST: Adding new food/restaurant review and rating 
 * Params           _id
 * Access           Public
 * Method           POST
 */

Router.post("/new",async (req,res) => {
    try{
        await validateRating(req.body);
        await validateReviewText(req.body);
        const {reviewData} = req.body;
        await ReviewModel.create({...reviewData});
        return res.json({reviews: "Successfull created review"});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});

/**
 * Router           /delete/:_id
 * Des              Delete a specific review
 * Params           _id
 * Access           Public
 * Method           DELETE
 */

Router.delete("/delete/:_id", async (req,res) => {
    try{
        const {_id} = req.params;
        await ReviewModel.findByIdAndDelete(_id);
        return res.json({review: "Review Successfullly deleted"});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

export default Router;