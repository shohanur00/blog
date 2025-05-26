const express = require('express')
const router = express.Router()


router.use((req,res,next) => {

    res.render('search-result')

})

module.exports = router