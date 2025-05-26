const express = require('express')
const router = express.Router()
const postModel = require('../models/post-details')

// router.use((req,res,next) => {

//     res.render('post-details')

// })

// router.get('/',(req,res)=>{
//     res.render('post-details')
// })

router.get('/:id', (req, res) => {
    const postId = req.params.id;

    postModel.getPost(postId, (err, getData) => {
        if (err) {
            console.error('Error fetching post:', err);
            return res.status(500).send('Server error');
        }

        if (!getData || getData.length === 0) {
            return res.status(404).send('Post not found');
        }

        res.render('post-details', { post: getData[0] }); // Assuming one post
    });
});

module.exports = router