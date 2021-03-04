const Sequelize=require('sequelize');



module.exports=class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            comment:{
                type:Sequelize.STRING(500),
                allowNull:false,
                },
            created_at:{
                type:Sequelize.DATE,
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
        db.Comment.belongsTo(db.User,{foreignKey:'commenter',targetKey:'name'});
        db.Comment.belongsTo(db.User,{foreignKey:'author',targetKey:'id'});
    }
}


