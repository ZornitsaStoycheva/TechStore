const router = require('express').Router();
const homeController = require('./controllers/homeController');
const deviceController = require('./controllers/deviceController');
const authController = require('./controllers/authController');

router.use(homeController);
router.use('/devices', deviceController);
router.use(authController);

router.all('*', (req, res) => {
    res.render('404')
})

module.exports = router;