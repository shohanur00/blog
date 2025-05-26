const express = require('express')
const router = express.Router()


router.use((req,res,next) => {

    res.render('tags')

})

module.exports = router