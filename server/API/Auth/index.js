//Libraries
import express from "express";
import passport from "passport";

//Models
import {UserModel} from "../../database/allModels";

//Validation
import {ValidateSignUp, ValidateSignIn} from '../../validation/auth';

//Create a User
const Router = express.Router();

/**
 * Router           /signUp
 * Des              Register a new User
 * Params           none
 * Access           Public
 * Method           Post
 */

Router.post("/signup",async (req,res) => {
        try{

                await ValidateSignUp(req.body.credentials);
               await UserModel.checkEmailAndPhone(req.body.credentials);
               const newUser = await UserModel.create(req.body.credentials);
               const token  = newUser.generateJwtToken(); 
                return res.status(200).json({token, status: "Success"});

        }catch(error){
                return res.status(500).json({error: error.message});
        }
});


/**
 * Router           /signin
 * Des              Register a new User
 * Params           none
 * Access           Public
 * Method           Post
 */

Router.post("/signin",async (req,res) => {
        try{
                await ValidateSignIn(req.body.credentials);
                const user = await UserModel.findByEmailAndPassword(req.body.credentials);
                const token = user.generateJwtToken();
                return res.status(200).json({token, status:"success"});

        }catch(error){
                return res.status(500).json({error:error.message});
        }
        

})

/**
 * Router           /google
 * Des              google signin
 * Params           none
 * Access           Public
 * Method           GET
 */
//trying to fetch the data from the passport 
Router.get("/google",passport.authenticate("google",{
        scope: [
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email",
        ],
}));

/** Router           /google/callback
* Des              google signin callback
* Params           none
* Access           Public
* Method           GET
*/
Router.get("/google/callback",passport.authenticate("google",{failureRedirect:"/"}),
        (req,res) => {
                return res.status(200).json({token: req.session.passport.user.token, status:"success"});
        }
);



export default Router;









// Router.post("/signup",async (req,res) => {
//         try{
//                 const { email, password, fullname, phoneNumber} = req.body.credentials;
//                 const checkUserByEmial = await UserModel.findOne({email});
//                 const checkUserByPhoneNumber = await UserModel.findOne({phoneNumber});

//                 if(checkUserByEmial || checkUserByPhoneNumber){
//                     return res.json({user: "User already exists"});
//                 }

//                 //hash the Passowds
//                 const bcryptSalt = await bcrypt.genSalt(5);
//                 const hashedPassword = await bcrypt.hash(password,bcryptSalt);

//                 //Save Data
//                 await UserModel.create({...req.body.credentials, passwowrd: hashedPassword});

//                 //generate a JWT Auth Token 
//                 const token = jwt.sign({user:{fullname,email}},"charanshaan22");
//                 return res.status(200).json({token, status: "Success"});

//         }catch(error){
//                 return res.status(500).json({error: error.message});
//         }
// });
