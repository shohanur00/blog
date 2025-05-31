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
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MemoryStore = require('memorystore')(session);



const indexRouter = require('./routes/index')
const aboutusRouter = require('./routes/about-us')
const error404 = require('./routes/error404')
const authorRouter = require('./routes/author')
const contactRouter = require('./routes/contact')
const postDetailsRouter = require('./routes/post-details')
const searchRouter = require('./routes/search')
const catRouter = require('./routes/category')
const archiveRouter = require('./routes/archive')



const adminLogin = require('./routes/admin/login')
//const addminDashboard = require('./routes/admin/dashboard')
 

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "script-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"]
      }
    }
  })
);
 
 

app.set('trust proxy', 1); // Trust first proxy
app.use(cookieParser());
app.use(session({
  name: 'session_id',
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: new MemoryStore({
    checkPeriod: 86400000 // Prune expired entries every 24h
  }),
  cookie: {
    maxAge: 86400000, // 1 day
    sameSite: 'lax',
    secure: false // Set to true if using HTTPS
  }
}));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: err });
});



app.use('/',indexRouter)
app.use('/contact',contactRouter)
app.use('/about',aboutusRouter)
app.use('/author',authorRouter)
app.use('/category',catRouter)
app.use('/posts',postDetailsRouter)
app.use('/search',searchRouter)
app.use('/archive',archiveRouter)


app.use('/admin',adminLogin)
//app.use('/dashboard',addminDashboard)

app.use(error404)

 



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


