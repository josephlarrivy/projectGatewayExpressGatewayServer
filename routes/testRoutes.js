const express = require('express');
const router = new express.Router();

router.get('/test', (req, res, next) => {
    return res.send('good get test')
});

router.post('/test', (req, res, next) => {
    return res.send('good post test')
});

module.exports = router;