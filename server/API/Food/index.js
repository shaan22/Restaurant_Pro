import express from "express";
import { FoodModel } from "../../database/food";

//Validate
import { ValidateCategory, ValidateRestaurantId } from "../../validation/common";

const Router = express.Router();

/**
 * Router           /r/:_id
 * Des              Get all foods based on the Restaurant id
 * Params           none
 * Access           Public
 * Method           Post
 */

Router.get("/r/:_id",async (req,res) => {
    try{
        await ValidateRestaurantId(req.params);
        const _id = req.params;
    const food = await FoodModel.find({restaurant: _id});
    if(!food){
        return res.status(404).json({error:"No food"});
    }
    return res.json({food});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
    
});

/**
 * Router           /r/:_id
 * Des              Get all foods based on the category
 * Params           none
 * Access           Public
 * Method           Post
 */

Router.get("/c/:category",async (req,res) => {
    try{
        await ValidateCategory(req.params);
        const {category} = req.params;
        const food = await FoodModel.find({category: {$regex:category, $options:"i"}});
        if(!food){
            return res.status(404).json({error:`No food matched with ${category}`});
        }
        return res.json({food});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
    
});

export default Router;