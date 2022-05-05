import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import verifyJWT from './middleware/verifyJWT.js';
import cookieParser from 'cookie-parser';
import cookies from 'cookie-parser';
import pb from 'body-parser';

import hospitalRoute from './routes/hospitalRoute.js'
import userAccountRoute from './routes/userAccountRoute.js';
import registerRoute from './routes/register.js';
import authRoute from './routes/auth.js';
import refreshRoute from './routes/refresh.js';
import logoutRoute from './routes/logout.js';

const app = express()
app.use(cors());
app.use(cookieParser());
app.use(pb.json())
app.use(pb.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to backend route
app.use('/hospitals', hospitalRoute)


app.use('/register', registerRoute);
app.use('/auth', authRoute);
app.use('/refresh', refreshRoute);
app.use('/logout', logoutRoute);


// app.use(verifyJWT);
app.use('/useraccounts', userAccountRoute)


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Expose-Headers", "Authorization");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//connect to mongoDB
const CONNECTION_URL = 'mongodb+srv://webfinalproject:webfinalproject123@cluster0.xlq1j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 8000

mongoose.connect(CONNECTION_URL, {
    useUnifiedTopology:true,
    useNewUrlParser:true
})
.then(()=> app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
.catch((error)=> console.log(error.message))
