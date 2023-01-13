
//Babel is a very famous transpiler that basically allows us to use future JavaScript in today's browsers. In simple words, 
//it can convert the latest version of JavaScript code into the one that the browser understands.
// require("@babel/core").transform("code", {
//     presets: ["@babel/preset-env"],
//   });

require('dotenv').config();
import mongoose from "mongoose";
import cors from "cors";

//connection
import connectionDb from "./database/connection";
//helmet is used to protect the express app by using inbuilt headers it basically provides security for the express
import helmet from "helmet";
import express from "express";
import passport from "passport";

//google authentication config
import googleConfig from "./config/google.config";
import session from "express-session";
//private route authentication config
import privateRouteConfig from './config/route.config';

//APIS
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Menu from "./API/Menu";
import Image from "./API/Image";
import Order from "./API/Orders";
import Review from "./API/Review";
import User from "./API/User";
//passport config
googleConfig(passport);
privateRouteConfig(passport);
//extensions
const zomato = express();
zomato.use(cors());
zomato.use(express.json());
zomato.use(helmet());
zomato.use(session({
  secret: 'keywhat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
 
zomato.use(passport.initialize());
zomato.use(passport.session());
//Set up tp default mongoose connnection
// const mongoDB = process.env.MONGODB_URI;
// mongoose.connect(mongoDB,{useNewUrlParser: true,useUnifiedTopology: true}).then(()=> console.log("CONNECTION ESTABLISHED"));

//API
zomato.use("/auth",Auth);
zomato.use("/restaurant",Restaurant);
zomato.use("/food",Food);
zomato.use("/menu",Menu);
zomato.use("/image",Image);
zomato.use("/order",Order);
zomato.use("/review",Review);
zomato.use("/user",User);

zomato.listen(4000,() =>{
  connectionDb().then(() =>{
    console.log("Server is Running !!!!");
  })
  .catch((error) => {
    console.log("Server is running ,but database connection failed...");
    console.log(error);
  });
});




//asscess//AKIATFQZRASOXO5VX3AR
//secret//An3fITUYdZc2gvW1DmtYzBX9jdsik04NupxkUeJT