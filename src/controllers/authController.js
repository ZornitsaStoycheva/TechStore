const router = require('express').Router();
const { isGuest } = require('../middlewares/authMiddleware');
const authService = require('../services/authService');
const deviceService = require('../services/deviceService');
const { getErrorMessage } = require('../utils/errorUtil');

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
})

router.post('/register', isGuest, async (req, res) => {
    const authData = req.body;

    try {
        const token = await authService.register(authData);
        res.cookie('auth', token, { httpOnly: true });

        res.redirect('/');
    } catch (err) {
        const {email} = req.body;
        res.render('auth/register',  { email, error: getErrorMessage(err) });
    }
})

router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
})

router.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);
        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/')
    } catch (err) {
        res.status(404).render('auth/login', { error: getErrorMessage(err) })
    }

})

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

router.get('/profile', async (req, res) => {
    const user = await authService.profile(req.user._id);
    const prefer = await deviceService.getAllByPreferredList(req.user._id).lean();
    const created = await deviceService.getCreatedItem(req.user._id).lean();
    res.render('auth/profile', { created, prefer, ...user})
})

module.exports = router;