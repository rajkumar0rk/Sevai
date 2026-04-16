import express from 'express';
const app=express();

app.use(express.json())

app.get("/health",(req,res)=>{
  res.status(200).json({
    "ResponseStatus":"success"
  })
})

export default app
