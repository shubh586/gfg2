require('dotenv').config();
const connectDB=require('./db/connect');
const Student=require('./models/student');

const jsonProducts=require('./students.json')

const start=async()=>{
  try {
    await connectDB(process.env.MONGO_URI)
    await Student.deleteMany();
    await Student.create(jsonProducts);
    console.log('Sucess');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}
start();