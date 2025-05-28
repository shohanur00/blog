const path = require('path')
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config({
        override: true,
        path: path.join(__dirname, ".env")
    })
}



 


const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const helmet = require('helmet');




const indexRouter = require('./routes/index')
const aboutusRouter = require('./routes/about-us')
const error404 = require('./routes/error404')
const authorRouter = require('./routes/author')
const authorSingleRouter = require('./routes/author-single')
const contactRouter = require('./routes/contact')
const postDetailsRouter = require('./routes/post-details')
const privacyPolicyRouter = require('./routes/privacy-policy')
const searchRouter = require('./routes/search-result')
const searchNotRouter = require('./routes/search-not-found')
const tagsRouter = require('./routes/tags')
const catRouter = require('./routes/category')

 

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(helmet());
 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: err });
});



app.use('/',indexRouter)
app.use('/contact',contactRouter)
app.use('/about',aboutusRouter)
app.use('/author',authorRouter)
app.use('/category',catRouter)
app.use('/privacy',privacyPolicyRouter)
app.use('/posts',postDetailsRouter)
app.use('/search',searchRouter)
app.use(error404)

 



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


