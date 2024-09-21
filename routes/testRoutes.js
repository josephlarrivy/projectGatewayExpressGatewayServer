const express = require('express');
const router = new express.Router();

router.get('/testGet', (req, res, next) => {
    return res.send('good get test')
});

router.post('/testPost', (req, res, next) => {
    return res.send('good post test')
});

module.exports = router;