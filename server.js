const express = require('express');
const app = express();
const router = require('./routes/questions');
const cors = require("cors");

app.use(
    cors({
        origin: "http://localhost:3000"
    })
);

app.use((req,res,next)=>{
    res.header("Access-Control-Origin", "*");
    res.header("Access-Control-Headers", "origin, X-Requested-Width, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Headers", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
//routes
app.use("/api",router);


app.use((req,res,next)=>{ 
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500).json({error: {
        "message" : error.message
    }});
});

app.listen(8000);