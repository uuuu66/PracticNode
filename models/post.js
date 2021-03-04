const Sequelize=require('sequelize');
const { post } = require('../route/page');
module.exports=class Posts extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name:{
                type:Sequelize.STRING(15),
                allowNull:false,
            },
            fileType:{
                type:Sequelize.STRING(15),
                allowNull:false,
            },
            story:{
                type:Sequelize.STRING(400),
                allowNull:true,
            },
            comment:{
                 type:Sequelize.TEXT,
                 allowNull:true,
            },
            created_at:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
            }
        },{
            sequelize,
            timestamps:true,
            paranoid:true,
            modelName:'Post',
            tableName:'post',
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',

        });
    }
    static associate(db){
        db.Post.belongsTo(db.User,{foreignKey:'author',targetKey:'name'});
        db.Post.hasMany(db.Comment,{foreignKey:'commenter',sourceKey:'id'});
    }
};