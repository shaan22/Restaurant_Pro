//Libraries
import express from "express";
import AWS from "aws-sdk";
import multer from "multer";

//Models
import { ImageModel } from "../../database/allModels";

//utility Function
import {s3Upload} from "../../utils/s3";

const Router = express.Router();

//multer config
const storage = multer.memoryStorage();
const upload = multer({storage});




/**
 * Router           /
 * Des              Uploads given image to s3 bucket and save file link into mongo
 * Params           none
 * Access           Public
 * Method           Post
 */
Router.post("/",upload.single("file"),async (req,res) =>{
    try{
        const file = req.file;

        //s3 bucket options
        const bucketOption = {
            Bucket: "shaans-zomato-master",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL:"public-read",
        };

        
        const uploadImage = await s3Upload(bucketOption);
        const saveImageToDatabase = await ImageModel.create({
            images:[{location: uploadImage.Location}],
        })
        return res.status(200).json({saveImageToDatabase});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

export default Router; 