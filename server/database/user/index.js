import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    fullname: {type:String,required: true},
    email: {type:String,required: true},
    password: {type: String},
    address: [{details: {type: String}, for: {type: String}}],
    phoneNumber: {type: Number},    
},
    {
        timestamps: true,
    }
);

UserSchema.methods.generateJwtToken = function(){
    return jwt.sign({user: this._id.toString()},"charanshaan22");
};

UserSchema.statics.checkEmailAndPhone = async ({email,phoneNumber}) => {
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhoneNumber = await UserModel.findOne({phoneNumber});

    if(checkUserByEmail || checkUserByPhoneNumber){
        throw new Error("User already Exists");   
    }

    return false;

};


UserSchema.statics.findByEmailAndPassword = async({email,password}) =>{
    const user = await UserModel.findOne({ email });
    if(!user) throw new Error("User does not exists");

    //compare password
    const checkUserByPassword = await UserModel.findOne({ password});
    if(!checkUserByPassword) throw new Error ("Invalid password");
    return user;
};


//so pre function is something which is done in between the process so here pre is excuting before save means before saving the data into the database
UserSchema.pre("save",function(next) {
    const user = this;

    //passowrd is modifies
    if(!user.isModified("password")) return next();

    //generate bcrypt salt
    bcrypt.genSalt(8,(error,salt) => {
        if(error) return next(error);

        //hash the passowrd
        bcrypt.hash(user.password,salt,(error,hash) => {
            if(error) return next(error);

            user.password = hash;
            return next();
        });
    });

});

export const UserModel = mongoose.model("users",UserSchema);