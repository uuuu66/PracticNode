const Sequelize=require('sequelize');



module.exports=class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name:{
                type:Sequelize.STRING(30),
                allowNull:false,
            },
            comment:{
                type:Sequelize.STRING(500),
                allowNull:false,
                },
            babycomment:{
                type:Sequelize.INTEGER(11),
                allowNull:true,
            },
            created_at:{
                type:Sequelize.STRING(150),
                allowNull:true,
                defaultValue:Sequelize.NOW,
                },

        },{sequelize,
            timestamps:false,
            modelName:'Comment',
            tableName:'comment',
            paranoid:false,
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',




        });

    }
    static associate(db){
        db.Comment.belongsTo(db.Post,{foreignKey:'comment_id',targetKey:'id'});
        db.Comment.belongsTo(db.User,{foreignKey:'commenter_id',targetKey:'id'});
        
    }
}


