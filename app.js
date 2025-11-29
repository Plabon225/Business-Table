import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import router from './src/routes/api.js';

const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser());

const DATABASE = 'mongodb://localhost:27017/business-table';

mongoose.connect(DATABASE,{autoIndex:true}).then(()=>{
    console.log("Database Connected");
}).catch(err=>{
    console.error("Not Connected "+err);
})

app.use("/api", router);


export default app;
