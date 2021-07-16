const Sequelize=require('sequelize');

module.exports=class Laboratory extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title:{
                type:Sequelize.STRING(40),
                allowNull:false,

            },
            category:{
                type:Sequelize.STRING(40),
                allowNull:false,

            },
            tag:{
                type:Sequelize.STRING(200),
                allowNull:false,
            }
            ,html:{
                type:Sequelize.STRING(200),
                allowNull:false,
            }

        },{
            sequelize,
            timestamps:false,
            paranoid:false,
            modelName:'Laboratory',
            tableName:'Laboratory',
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',

        });


    }




}