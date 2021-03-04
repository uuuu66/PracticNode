const express= require('express');
const path=require('path');
const pug=require('pug');
const dontenv=require('dotenv');
const morgan=require('morgan');

const cookiePareser=require('cookie-parser');
const pageRouter =require('./route/page');
const {sequelize}=require('./models');
const indexRouter=require('./route/index');
var app=express();
dontenv.config();



const { fstat } = require('fs');
sequelize.sync({force:false})
.then(()=>{
    console.log("디비연결 성공");
})
.catch((err)=>{
    console.error(err);
});
app.set('views',path.join(__dirname,'./views'));
app.set('view engine','pug');

app.use(express.static(path.join(__dirname,'public')));

app.use(
    morgan('dev'),
    express.json(),
    express.urlencoded({extended:false}),
    cookiePareser(process.env.COOKI_PARSER),
);
app.use(express.urlencoded({extended:false}));
app.use('/',pageRouter);
app.use('/index',indexRouter);

app.use('/dbimages',express.static(path.join(__dirname,'uploads')));
app.listen(30000,(req,res)=>{
    console.log(1122);
});

//app.use(errorHandler);
