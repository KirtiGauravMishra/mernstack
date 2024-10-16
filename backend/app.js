import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
// import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import auth from "./routes/auth.js";
import admin from './routes/adminRoutes.js';
import appraisal from './routes/appraisalRoutes.js'

const app = express();
dotenv.config({path:"./config/config.env"})

// cookieparser used for getting token and authorization
app.use(cookieParser());

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));



dbConnection();
// app.use(errorMiddleware)
app.use("/api/v1/auth",auth);
app.use("/api/v1/admin",admin);
app.use("/api/v1/appraisal",appraisal)

app.listen(process.env.PORT,()=>{
    console.log(`server Running on port ${process.env.PORT}`);
})

export default app; 