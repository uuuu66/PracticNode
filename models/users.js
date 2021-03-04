const Sequelize=require('sequelize');


module.exports=class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
              },
              password:{
                  type:Sequelize.STRING(100),
                  allowNull:true,
              },
              email:{
                type: Sequelize.STRING(40),
                allowNull: false,
                unique:true,
              },
              comment: {
                type: Sequelize.TEXT,
                allowNull: true,
              },
              posts:{
                  type:Sequelize.INTEGER.UNSIGNED,
                  allowNull:true,

              }
              
        },{
            sequelize,
            timestamps : false,
            underscored :false,
            modelName:'User',
            tableName:'user',
            paranoid:true,
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',

        });
    }
    static associate(db){
        db.User.hasMany(db.Comment,{foreignKey:'commenter',sourceKey:'name'});
        db.User.hasMany(db.Post,{foreignKey:'author',sourceKey:'name'});
    }

};