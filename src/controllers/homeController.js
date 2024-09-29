const router = require('express').Router();
const homeService = require('../services/homeService');
const deviceService = require('../services/deviceService');

router.get('/', async (req, res) => {
    const devices = await homeService.home().lean();
    res.render('home', {devices});
})

router.get('/about', (req, res) => {
    res.render('about')
})

module.exports = router;