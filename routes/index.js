const express = require('express');
const router = express.Router();
const indexModel = require('../models/index');

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
        const result = await indexModel.getIndexData({ limit, offset });
        //console.log(result);

        res.render('index', {
            ...result,
            currentPage: page,
            totalPages: Math.ceil(result.post.totalCount / limit),
            showRecent: true
        });

         //res.render('index',result)
    } catch (error) {
        console.error('Route error:', error);
        res.sendStatus(500);
    }
});

module.exports = router;
