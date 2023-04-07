const connect = require("./Connect")
const express = require("express");
const app = express();
const cors=require('cors')
app.use(express.json())
app.use(cors())

app.post("/insert", async(req,res)=>{
    var collection = await connect();
    let result = await collection.insertOne(req.body)
    res.send(result);
})

app.post("/delete", async(req,res)=>{
    var collection = await connect();
    let result = await collection.deleteOne(req.body)
    res.send(result);
})

app.get("/getdb", async(req,res)=>{
    var collection = await connect();
    let result = await collection.find().toArray();
    res.send(result);
})

app.listen(5000)

