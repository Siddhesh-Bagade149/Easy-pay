const express = require("express");
const rootRouter = require('./routes/index')
const app = express();
const cors= require('cors')
// const bodyParser = require('body-parser'); 
const port=process.env.PORT || 3000

app.use(cors({
    origin:["https://easy-pay-pi.vercel.app/"],
    methods:["POST","GET","PUT"],
    credentials:true
}))
app.use(express.json()) // no need for bodyparse.json() anymore

app.use("/api/v1",rootRouter)

app.listen(port,()=>{
    console.log('server running at 3000 ');
})