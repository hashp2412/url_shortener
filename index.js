const express = require("express")
const {connectToMongoDB} = require("./connect")
const app = express()
const PORT = 8000;
const URL = require('./models/urls')
const urlRoute = require('./routes/url')
connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=>console.log("DB connected"))
app.use(express.json())
app.use("/url",urlRoute)
app.get('/:shortId',async(req,res)=>{
const shortId = req.params.shortId;
const entry = await URL.findOneAndUpdate(
    {shortId},{
    $push:{
        visitHistiory:{
            timeStamp:Date.now()
        },
    },
},
{ new: true }
)

res.redirect(entry.redirectUrl)
})
app.listen(PORT,()=>console.log("server started at "+ PORT))
