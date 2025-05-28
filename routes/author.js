const express = require('express');
const router = express.Router();
const authModel = require('../models/author');

router.get('/:id', async (req, res) => {

    const authid = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
        const result = await authModel.getIndexData({ authid,limit, offset });
        //console.log(result);

        let targetText = '';
        if (Array.isArray(result.author)) {
            const matched = result.author.find(element => element.id == authid);
            if (matched) {
                targetText = matched.name;
            }
        }

        console.log(result.post)
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
