const express = require('express');
const dotenv=require('dotenv').config();
const cors=require('cors'); //accept requests from different origins.
const {mongoose}=require('mongoose');

//Set up express server and connect it to mongo

//connect to database
mongoose.connect(process.env.MONGO_URL).then(()=>console.log('Database Connected')).catch((err:Error)=>console.log('Failed to connect to database',err))
//initialize express server
const app = express();
//middleware
app.use(express.json());// parse incoming requests with JSON payloads.

app.use('/',require('./routes/authRoutes')) //sets up route handling 

//initialze port
const port = 8000
app.listen(port,()=>console.log(`Server is running on port ${port}`))