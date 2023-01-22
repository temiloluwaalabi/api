import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import dotenv from "dotenv"
import cors from 'cors';
import helmet from "helmet";
import morgan from "morgan";
import path  from "path";

// import formidable from "formidable";



import { fileURLToPath } from "url";
import connectDB from "./config/dbConn.js"
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOption.js";


import courseRoute from "./routes/courses/courses.js";
import moduleRoute from "./routes/courses/modules.js";
import userRoute from "./routes/users/users.js";
import registerRoute from "./routes/auth/register.js";
import loginRoute from "./routes/auth/login.js";
import logoutRoute from "./routes/auth/logout.js";
import refreshRoute from "./routes/auth/refresh.js";
import profileRoute from "./routes/auth/profileUpdate.js";
import voterRoute from "./routes/voters/voters.js"
import categoryRoute from "./routes/categories/category.js"
import credentials from "./middlewares/credentials.js"
import verifyJwt from "./middlewares/verifyJwt.js";
import handleNewAdmin from "./controllers/RegisterAdmin.js";
// CONFIGURATIONs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
dotenv.config()
// app.use(cors())
app.use(credentials);
app.use(cors(corsOptions));
const app = express();
app.use(express.json());
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
// app.use("/uploads", express.static('uploads')) //local starage

app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));

app.use(cookieParser());

const PORT = process.env.PORT || 5800;

// app.post("/auth/registerAdmin", upload.single("picture"), handleNewAdmin)

// if (process.env.NODE_ENV == 'production') {
//     app.use(express.static('client/build'))
//     const path = require('path')
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
//   }
  

// app.post("/profile", verifyToken, upload.single("picture"), userController)

app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();
})
//connect to DB
mongoose.set('strictQuery', true);
// connectDB();
//connect to db
mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        //listen for request
        app.listen(process.env.PORT, ()=>{
        console.log('connected to db & Listening on port 4000');
        })
    })
    .catch((err)=>{
        console.log(err);
})


// mongoose.connection.once('open', () => {
//     console.log('Connected to MongoDB');
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
// })




//routing
app.get('/', (req, res) => {
    res.status(200).json("Hello World")
    console.log("Welcome to pass api")
})


app.use('/auth/register', registerRoute)
app.use('/auth/login', loginRoute)
app.use('/auth/refresh', refreshRoute)
app.use('/auth/logout', logoutRoute)
app.use('/auth/profileUpdate', profileRoute)
app.use("/api/user", userRoute );

// app.use(verifyJwt)
app.use("/api/category", categoryRoute);
app.use("/api/courses", courseRoute );
app.use("/api/modules", moduleRoute );

//voters routes
app.use('/api/voter', voterRoute);

//category route

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})