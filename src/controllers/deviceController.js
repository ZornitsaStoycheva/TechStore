const deviceService = require('../services/deviceService');
const router = require('express').Router();

router.get('/catalog', async (req, res) => {
    const devices = await deviceService.getAllDevices().lean();
    res.render('devices/catalog', {devices})
})

router.get('/:deviceId/details', async (req, res) => {
    const device = await deviceService.getOne(req.params.deviceId).lean();
    res.render('devices/details', { device })
})

router.get('/:deviceId/delete', async (req, res) => {
    await deviceService.del(req.params.deviceId).lean();
    res.render('devices/catalog')
})

router.get('/create', (req, res) => {
    res.render('devices/create')
})

router.post('/create', async (req, res) => {

    const deviceData = req.body;

    await deviceService.create(deviceData);
        res.redirect('/')
    // try {
    //     await deviceService.create(deviceData);
    //     res.redirect('/')
    // } catch (err) {
    //     res.render('devices/create', { ...deviceData})
    // }

})

module.exports = router;