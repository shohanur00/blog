const express = require('express');
const router = express.Router();
const postModel = require('../models/post-details');
const indexModel = require('../models/index');
const catModel = require('../models/category')

router.get('/:id', (req, res) => {
    const catId = req.params.id;
    console.log(`Fetching post for category ID: ${catId}`);

    indexModel.getIndexData((indexErr, indexResult) => {
        if (indexErr) {
            console.error('Error fetching index data:', indexErr);
            return res.status(500).send('Server error loading index data');
        }

        catModel.getCat(catId, (postErr, getData) => {
            if (postErr) {
                console.error('Error fetching post:', postErr);
                return res.status(500).send('Server error loading post');
            }

            if (!getData || getData.length === 0) {
                return res.status(404).send('Post not found');
            }

            let targetText = '';
            if (Array.isArray(indexResult.category)) {
                const matched = indexResult.category.find(element => element.id == catId);
                if (matched) {
                    targetText = matched.name;
                }
            }

            const resultData = {
                ...indexResult,
                target_text: targetText,
                post: getData,
                showRecent: false
            };

            console.log('Rendering post-list with data:', resultData);
            res.render('post-list', resultData);
        });
    });
});

module.exports = router;