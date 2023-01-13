//Libraries
import express from "express";

//Model
import { RestaurantModel } from "../../database/allModels";

//Validate
import { validateRestaurantCity, validateRestaurantSearchString } from "../../validation/restaurant";
import { ValidateRestaurantId } from "../../validation/common";

const Router = express.Router();

/**
 * Router           /
 * Des              find all the restaurants in the city
 * Params           none
 * Access           Public
 * Method           Post
 */
Router.get("/",async (req,res) => {
    try{
        await validateRestaurantCity(req.query);
        const city = req.query;
        const restaurant = await RestaurantModel.find({ city });
        if(restaurant.length === 0){
        return res.json({error:"NO Restaurants available in this city"});
        }
        return res.json({restaurant});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});


/**
 * Router           /_id
 * Des              find individual restaurant based on id
 * Params           none
 * Access           Public
 * Method           Post
 */
Router.get("/:_id",async (req,res) => {
    try{
        await ValidateRestaurantId(req.params);
        const {_id} = req.params;
        const restaurant = await RestaurantModel.findById({_id});
        if(!restaurant){
            return res.json({error:" Restaurant Not Found"});
        }
        return res.status(200).json({restaurant});

    }catch(error){
        return res.status(500).json({error: error.message});
    }
});

/**
 * Router           /search/:searchString
 * Des              find individual restaurant based on id
 * Params           none
 * Access           Public
 * Method           Post
 */
Router.get("/search/:searchString",async (req,res)=> {
    await validateRestaurantSearchString(req.params);
    const {searchString}= req.params;
    const restaurant = await RestaurantModel.find({
        //this line writing returns results based on letters  ,words like that and options is used becuz
        //search should not consider upper or lower case letters
        name: {$regex: searchString, $options: "i"},
    });
    if(!restaurant){
        return res.status(404).json({error:`No Restaurant Mathched with ${searchString}`});
    }
    return res.json({restaurant});
});

export default Router;