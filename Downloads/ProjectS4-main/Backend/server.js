const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectToDB = require("./config/db.js");
const {configCloudinary} = require("./config/cd.js");
const Routes = require("./router/apiRoute.js");

dotenv.config();

const app = express();
app.use(express.json());
connectToDB();
configCloudinary();
app.use("/api" , Routes);

app.listen(4000 , () =>{
    console.log("Server on port : 4000")
})