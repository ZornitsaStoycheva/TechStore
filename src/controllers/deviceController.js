const deviceService = require('../services/deviceService');
const router = require('express').Router();
const { getErrorMessage } = require('../utils/errorUtil');
const { isGuest, isAuth } = require('../middlewares/authMiddleware');

router.get('/catalog', async (req, res) => {
    const devices = await deviceService.getAllDevices().lean();
    res.render('devices/catalog', {devices})
})

router.get('/:deviceId/details', async (req, res) => {
    const device = await deviceService.getOne(req.params.deviceId).lean();
    const isOwner = device.owner._id == req.user?._id;
    const isPreferredList = device.preferredList.some(x => x._id == req.user?._id)
    const isAuthenticated = !!req.user;
    res.render('devices/details', { isOwner, isAuthenticated, isPreferredList, device })
})

router.get('/:deviceId/delete', isAuth, async (req, res) => {
    await deviceService.del(req.params.deviceId).lean();
    res.redirect('/devices/catalog')
})

router.get('/:deviceId/prefer', isAuth,  async (req, res) => {
    await deviceService.prefer(req.params.deviceId, req.user._id);
    res.redirect(`/devices/${req.params.deviceId}/details`)
})

router.get('/:deviceId/edit', isAuth, async (req, res) => {
    const device = await deviceService.getOneById(req.params.deviceId).lean();
    res.render('devices/edit', { device })
})

router.post('/:deviceId/edit', isAuth,  async (req, res) => {
    const device = await deviceService.edit(req.params.deviceId, req.body);
    console.log(req.body)
    try {
        
        //res.redirect('/devices/catalog', {device})
        res.redirect(`/devices/${req.params.deviceId}/details`);
    } catch (err) {
        res.render(`devices/edit`, {...device, error: getErrorMessage(err)})
    }
})

router.get('/create', isAuth, (req, res) => {
    res.render('devices/create')
})

router.post('/create', isAuth, async (req, res) => {

    const devices = req.body;
   
    try {
        await deviceService.create({...devices, owner: req.user._id});
        res.redirect('/devices/catalog')
    } catch (err) {
        res.render('devices/create', { ...devices, error: getErrorMessage(err)})
    }

})

module.exports = router;