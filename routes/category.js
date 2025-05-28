const express = require('express');
const router = express.Router();
const catModel = require('../models/category');

router.get('/:id', async (req, res) => {

    const catid = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = 2;
    const offset = (page - 1) * limit;

    try {
        const result = await catModel.getIndexData({ catid,limit, offset });
        //console.log(result);

        let targetText = '';
        if (Array.isArray(result.author)) {
            const matched = result.category.find(element => element.id == catid);
            if (matched) {
                targetText = matched.name;
            }
        }
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
