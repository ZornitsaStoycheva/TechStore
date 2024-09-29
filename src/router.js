const router = require('express').Router();
const homeController = require('./controllers/homeController');
const deviceController = require('./controllers/deviceController');


router.use(homeController);
router.use('/devices', deviceController);

module.exports = router;