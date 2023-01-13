import express from "express";

//Models
import { MenuModel,ImageModel } from "../../database/allModels";

const Router = express.Router();

/**
 * Router           /list
 * Des              Get all lists based on the restaurant id
 * Params           none
 * Access           Public
 * Method           Post
 */
Router.get("/list/:_id",async(req,res) => {
    try{
        const {_id} = req.params;
        const menu = await MenuModel.findById({_id});

        if(!menu){
            return res.status(404).json({error: "No menu present for this Restaurant"});
        }
        return res.json({menu});    
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});

/**
 * Router           /list
 * Des              Get all lists of menu images based on the restaurant id
 * Params           none
 * Access           Public
 * Method           Post
 */
Router.get("/image/:_id",async (req,res) => {
    try{    
        const {_id} = req.params;
        const menuImages = await ImageModel.find({_id});
        if(!menuImages){
            return res.status(404).json({error: "No Images present for this Restaurant"});
        }
        return res.json({menuImages});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});


export default Router;
