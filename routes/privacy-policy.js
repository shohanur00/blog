const express = require('express')
const router = express.Router()


router.use((req,res,next) => {

    res.render('privacy-policy')

})

module.exports = router