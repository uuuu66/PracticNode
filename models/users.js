const Sequelize=require('sequelize');


module.exports=class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name: {
                type:Sequelize.STRING(40),
                allowNull:false,
                
            }
            ,
            email:{
                type: Sequelize.STRING(40),
                allowNull: false,
                unique:true,
              },
              password:{
                  type:Sequelize.STRING(100),
                  allowNull:true,
              },
              provider:{
                  type:Sequelize.STRING(20),
                  allowNull:true,
              },
              auth:{
                  type:Sequelize.INTEGER(1),
                  defaultValue: 0,
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
        db.User.hasMany(db.Comment,{foreignKey:'commenter_id',sourceKey:'id'});
        db.User.hasMany(db.Post,{foreignKey:'posts_id',sourceKey:'id'});
    }

};