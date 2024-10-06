const mongoose=require('mongoose')

const studentSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,'Product name must be provided']
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  rollNo:{
    type:Number,
    required:[true,'RollNo must be provided']
  },
  sem:{
    type:Number,
    required:[true,'Semester must be provided'],
    min: [0.0, 'CGPA cannot be less than 0.0'],
    max: [10.0, 'CGPA cannot be more than 10.0']
  },
  age:{
    type:Number,
    required:[true,'Age must be provided']
  },
  course: { type: String, required: true },
 
  dateEnrolled: { type: Date, default: Date.now },
  cgpa: {
    type: Number,
    required: [true, 'CGPA must be provided'],
    min: [0.0, 'CGPA cannot be less than 0.0'],
    max: [10.0, 'CGPA cannot be more than 10.0']
  },
  
  college:{
    type:String,
    enum:{
      values:['rcoem','kd','ycc','vnit'],
      message:`{VALUE} is not supported`,
    }
  }
})
module.exports=mongoose.model('Student',studentSchema);





