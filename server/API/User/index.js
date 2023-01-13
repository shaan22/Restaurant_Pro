//Libraries 
import express from 'express';

//Database Model
import { UserModel } from '../../database/allModels';

const Router = express.Router();
/**
 * Router           /:_id
 * Des              Get User data
 * Params           _id
 * Access           Public
 * Method           GET
 */

Router.get("/:id", async (req, res) => {
    try{
        const {_id} = req.params;
        const getUser = await UserModel.findById(_id);
        if(!getUser){
            return res.status(500).json({error:"User Not Found"});
        }

        return res.json({user : getUser});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

/**
 * Router           /update/:userId
 * Des              Update User data
 * Params           _id
 * Access           Public
 * Method           PUT
 */

Router.put("/update/:userId", async(req,res) => {
    try{
        const {userId} = req.params;
        const {userData} = req.body;
        const updateUserData = await UserModel.findByIdAndUpdate(
              userId,    {
                $set: userData,
            },
            {
                    new : true
            }
        
        );
        return res.json({user: updateUserData});


    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

export default Router;
