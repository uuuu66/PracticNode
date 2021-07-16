const express= require('express');
const path=require('path');
const pug=require('pug');
const dontenv=require('dotenv');
const morgan=require('morgan');
const session=require('express-session')
const passport=require('passport');
const cookiePareser=require('cookie-parser');
const pageRouter =require('./route/page');
const authRouter=require('./route/auth');
const postRouter =require('./route/post');
const dotRouter=require('./route/dot');
const labRouter=require('./route/laboratory')
const {sequelize}=require('./models');
const indexRouter=require('./route/index');
const passportConfig=require('./passport');
const chatRouter=require('./route/chat');
const villeage=require('./route/villeage');
const mongooseConnect=require('./schemas');
const webSocket=require('./route/socket');
const logs=require('./logs/logs');
var app=express();
dontenv.config();
passportConfig();
const sessionMiddleware=session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    }
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cookiePareser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
sequelize.sync({force:false})
.then(()=>{
    console.log("디비연결 성공");
})
.catch((err)=>{
    console.error(err);
});


app.set('views',path.join(__dirname,'./views'));
app.set('view engine','pug');
mongooseConnect();
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'laboratory')))




app.use('/',logs.writeLog,pageRouter);
app.use('/index',logs.writeLog,indexRouter);
app.use('/auth',logs.writeLog,authRouter);
app.use('/post',logs.writeLog,postRouter);
app.use('/dotgallery',logs.writeLog,dotRouter);
app.use('/lab',logs.writeLog,labRouter);
app.use('/chat',chatRouter);
app.use("/villeage",villeage);
//app.use('/sign',signRouter);
//app.use('/find',findRouter);
app.use('/dbimages',express.static(path.join(__dirname,'uploads')));
const server =app.listen(30000,(req,res)=>{
 
});


server.keepAliveTimeout = 61 * 1000;

app.use(errorHandler);
function errorHandler(err,req,res,next){
    logs.writeErrlog(err,req);
    console.log(err);
   console.log("errorocuured");
}
app.use(function(req, res, next) {
   
    logs.writeErrlog(404,req);
    res.status(404)
        .render('error',{error:"파일이 없습니다."})
  });
  webSocket(server,app,sessionMiddleware);