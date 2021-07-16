const Sequelize=require('sequelize');
const { post } = require('../route/page');
module.exports=class Posts extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title:{
                type:Sequelize.STRING(50),
                allowNull:false,
            },
            fileType:{
                type:Sequelize.STRING(15),
                allowNull:false,
            },
            category:{
                type:Sequelize.STRING(15),
                allowNull:false,
            },
            detailcategory:{
                type:Sequelize.STRING(20),
                allowNull:true,
            },
            story:{
                type:Sequelize.TEXT,   
                allowNull:true,
            },
            cstory:{
                type:Sequelize.TEXT,
                allowNull:true,
            },
            author:{
                type:Sequelize.STRING(40),
                allowNull:false,
            },
         
            created_at:{
                type:Sequelize.STRING(40),
                allowNull:false,
                defaultValue:Sequelize.NOW,
            },
            views:{
                type:Sequelize.INTEGER(10),
                allowNull:true,
                defaultValue:0,
            }
        },{
            sequelize,
            timestamps:false,
            paranoid:false,
            modelName:'Post',
            tableName:'post',
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',

        });
    }
    static associate(db){
        db.Post.belongsTo(db.User,{foreignKey:'posts_id',targetKey:'id'});
        db.Post.hasMany(db.Comment,{foreignKey:'comment_id',sourceKey:'id'});
    }
};