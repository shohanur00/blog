const express = require('express');
const router = express.Router();
const postModel = require('../models/post-details');
const indexModel = require('../models/index');

router.get('/:id', (req, res) => {
    const postId = req.params.id;

    indexModel.getIndexData((indexErr, indexResult) => {
        if (indexErr) {
            console.error('Error fetching index data:', indexErr);
            return res.status(500).send('Server error loading index data');
        }

        postModel.getPost(postId, (postErr, getData) => {
            if (postErr) {
                console.error('Error fetching post:', postErr);
                return res.status(500).send('Server error loading post');
            }

            if (!getData || getData.length === 0) {
                return res.status(404).send('Post not found');
            }
            
            indexResult.target_post = getData[0]
            console.log(indexResult.target_post)
            res.render('post-details', indexResult);
        });
    });
});

module.exports = router;