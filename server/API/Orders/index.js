//Libraries
import express, { json } from 'express';
import passport from 'passport';
import ValidateUser from '../../config/validateUser';

//Database Model
import { OrderModel } from '../../database/allModels';

const Router = express.Router();

/**
 * Router           /
 * Des              Get all order based on the  id
 * Params           _id
 * Access           Public
 * Method           GET
 */

Router.get("/:_id",passport.authenticate("jwt"), async (req,res) => {
    try{
        await ValidateUser(req,res);
        const {_id} = req.params;
        const getOrders = await OrderModel.findOne({user: _id});
        if(!getOrders){
            return res.status(400).json({error:'User not found'});
        }
        return res.status(200).json({orders: getOrders});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

/**
 * Router           /new
 * Des              Adding a new Route
 * Params           _id
 * Access           Public
 * Method           POST
 */
    Router.post("/new/:_id",async(req,res) =>{
        const {_id} = req.params;
        const {orderDetails} = req.body;
        const addNewOrder = await OrderModel.findOneAndUpdate(
            {
                user: _id,
            },
            {
                $push: {orderDetails},
            },
            {new:true}
            );
            return res.json({order: addNewOrder});
    });

export default Router;