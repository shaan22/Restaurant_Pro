import mongoose, { mongo } from "mongoose";

const ImageSchema = new mongoose.Schema({
    images: [{location: {type:String,required: true}}]
});

export const ImageModel = mongoose.model("images",ImageSchema);