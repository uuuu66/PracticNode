'use strict';


const Sequelize = require('sequelize');
const User=require('./users');
const Comment =require('./comment');
const Posts =require('./post');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};



const sequelize=new Sequelize(config.database,config.username,config.password,config);
db.sequelize=sequelize;
db.User=User;
db.Comment=Comment;
db.Post= Posts;
User.init(sequelize);
Comment.init(sequelize);
Posts.init(sequelize);

User.associate(db);
Comment.associate(db);
Posts.associate(db);

module.exports = db;
