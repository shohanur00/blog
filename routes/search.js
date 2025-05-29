const express = require('express');
const router = express.Router();
const searchModel = require('../models/search');

router.post('/', async (req, res) => {

    //const searchQuery = req.body.query;
    //console.log(searchQuery)
    const authid = req.body.query;;
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const offset = (page - 1) * limit;

    try {
        const result = await searchModel.getIndexData({ authid,limit, offset });
        //console.log(result);

        let targetText = authid;
        

        //console.log(result.post)
        res.render('post-list', {
            ...result,
            target_text: targetText,
            currentPage: page,
            totalPages: Math.ceil(result.post.totalCount / limit),
            showRecent: false
        });

         //res.render('index',result)
    } catch (error) {
        console.error('Route error:', error);
        res.sendStatus(500);
    }
});

module.exports = router;