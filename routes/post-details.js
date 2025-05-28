const express = require('express');
const router = express.Router();
const postModel = require('../models/post-details');
const indexModel = require('../models/index');

// Route to display individual post with index data and recent posts
router.get('/:id', async (req, res) => {
    const postId = req.params.id;
    const limit = 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;
    try {
        const result = await indexModel.getIndexData({ limit, offset });
        //console.log(result);
        const target_post = await postModel.getPost(postId);
        

        res.render('post-details', {
            ...result,
            target_post:target_post[0],
            currentPage: page,
            totalPages: Math.ceil(result.post.totalCount / limit),
            showRecent: true
        });


    } catch (error) {
        console.error('Route error:', error);
        res.sendStatus(500);
    }
    
    
});

module.exports = router;
