const express = require('express')
const router = express.Router()
const indexModel = require('../models/index')
//const db = require('../models/db')


router.get('/', (req, res) => {

    indexModel.getIndexData((error,result)=>{
        if (error) {
            console.log(error)
        } else {

            res.render('index', result);
            //console.log(result.author[0].name)
        
        }
       
    })
    

});



module.exports = router