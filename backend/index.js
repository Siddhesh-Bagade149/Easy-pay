const express = require("express");
const rootRouter = require('./routes/index')
const app = express();
const cors= require('cors')
// const bodyParser = require('body-parser'); 

app.use(cors({
    origin:["https://easy-pay-xi.vercel.app/"],
    methods:["POST","GET","PUT"],
    credentials:true
}))
app.use(express.json()) // no need for bodyparse.json() anymore

app.use("/api/v1",rootRouter)

app.listen(3000,()=>{
    console.log('server running at 3000 ');
})