//import modules
const express = require('express');
const router = express.Router(); //used to create a new router object to handle routes.
const cors = require('cors'); //For handling HTTP requests
const {test,registerUser} =require('../controllers/authController') //route handlers from authController

// apply the CORS middleware to the router.
router.use(
    cors({
        credentials:true, //Allow cookies to be sent in cross-origin requests.
        origin:'http://localhost:5173' //only allow cookies from frontend
    })
);

//define routes
router.get('/', test)
router.post('/register',registerUser)

//export express
module.exports = router;