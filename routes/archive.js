const express = require('express');
const router = express.Router();
const archiveModel = require('../models/archive');
//import { numBang } from 'bang-utils';


router.get('/:month/:year', async (req, res) => {
    const { month,year } = req.params;
    //res.send(`Year: ${year}, Month: ${month}`);
    const page = parseInt(req.query.page) || 1;
        const limit = 8;
        const offset = (page - 1) * limit;
    
        try {
            const result = await archiveModel.getIndexData({ month,year,limit, offset });
            console.log(result);
            const monthNames =  [
                                  "জানুয়ারি", // January
                                  "ফেব্রুয়ারি", // February
                                  "মার্চ",     // March
                                  "এপ্রিল",    // April
                                  "মে",        // May
                                  "জুন",       // June
                                  "জুলাই",     // July
                                  "আগস্ট",     // August
                                  "সেপ্টেম্বর", // September
                                  "অক্টোবর",   // October
                                  "নভেম্বর",   // November
                                  "ডিসেম্বর"   // December
                                ];

            const monthName = monthNames[month - 1];
            
         
            let targetText = monthName+' '+year;
       
            res.render('post-list', {
                ...result,
                target_text: targetText,
                currentPage: page,
                totalPages: Math.ceil(result.post.totalCount / limit),
                showRecent: true
            });
    
             //res.render('index',result)
        } catch (error) {
            console.error('Route error:', error);
            res.sendStatus(500);
        }
  });
  


module.exports = router;