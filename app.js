require('dotenv').config();
const express=require('express');
require('express-async-errors') 

const connectDB=require('../starter/db/connect');
const app=express();

const notfoundmiddleware=require('./middleware/not-found');
const finderror=require('./middleware/error-handler');

const StudentsRouter=require('../starter/routes/students')
app.use(express.json())


app.use('/api/v1/students',StudentsRouter)
app.get('/',(req,res)=>{
  res.send(`<h1>Hi go back to home ai is talking your job</h1>`)
})
app.use(notfoundmiddleware);
app.use(finderror);
const port=process.env.PORT||3000;
const start=async()=>{
  try {

    await connectDB(process.env.MONGO_URI)
    app.listen(port,console.log('Server is started')
    );

  } catch (error) {
    console.log(error);
  }
}
start();