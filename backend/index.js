const express = require("express");
// const rootRouter = require('./routes/index')
const userRouter= require('./routes/user')
const accountRouter= require('./routes/accounts')

const app = express();
const cors = require('cors')
// const bodyParser = require('body-parser'); 
const port = process.env.PORT || 3000

app.use(cors({
    origin: ["https://easy-pay-pi.vercel.app/"],
    methods: ["POST", "GET", "PUT"],
    credentials: true
}))
app.use(express.json()) // no need for bodyparse.json() anymore

// app.use("http://localhost:3000/", rootRouter)
// app.use("api/v1/", rootRouter)
// app.use("https://easy-pay-backend.onrender.com/", rootRouter)
app.get('/', (req, res) => {
    res.send('/ route workig')
})

// const router = express.Router();
// app.use('https://easy-pay-backend.onrender.com/user',userRouter)
// app.use('https://easy-pay-backend.onrender.com/account',accountRouter);
app.use('/user',userRouter)
app.use('/account',accountRouter);

app.listen(port, () => {
    console.log('server running at 3000 ');
})
