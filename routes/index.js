const express=require('express');
const asyncMiddleware = require('../middleware/async');
const router = express.Router();
const error = require('../middleware/error');
const auth = require('../middleware/auth');
const authController = require('../controllers/auth-controller');
const userController = require('../controllers/user-controller');
const deviceController = require('../controllers/device-controller');

module.exports=function(app){
app.use(express.json());


app.use('/api', router.post('/auth', asyncMiddleware(authController.auth)));
app.use('/api',router.post('/user', auth ,asyncMiddleware(userController.createUser)));

app.use('/api',router.get('/device',auth,asyncMiddleware(deviceController.getDevices) ));
app.use('/api',router.post('/device', auth, asyncMiddleware(deviceController.createDevice)));
app.use('/api',router.put('/device/:id',auth, asyncMiddleware(deviceController.checkDevice)));
app.use('/api',router.delete('/device/:id',auth, asyncMiddleware(deviceController.deleteDevice)));

app.use(error);
}



