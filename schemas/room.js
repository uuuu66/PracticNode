const mongoose=require('mongoose');
const {Schema}=mongoose;
const roomSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    size:{
        type:Number,
        required:true,
        default:0,
    },
    createdAt:{
        type:String,
        default:"방금"
    },
    isActive:{
        type:Boolean,
        default:true,
    },
    password:{
        type:String,
        default:'',
    },
    recent:{
        type:String,
        default:"방금 만듬"
    },
    users:{
        type:Array,
        default:[],
    }   
    

});

module.exports=mongoose.model('Room',roomSchema);