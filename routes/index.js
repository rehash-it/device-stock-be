const express=require('express');
const asyncMiddleware = require('../middleware/async');
const router = express.Router();
const error = require('../middleware/error');
const auth = require('../middleware/auth');
const authController = require('../controllers/auth-controller');
const userController = require('../controllers/user-controller');

module.exports=function(app){
app.use(express.json());


app.use('/api', router.post('/auth', asyncMiddleware(authController.auth)));

app.use('/api',router.post('/user', auth ,asyncMiddleware(userController.createUser)));

app.use(error);
}



