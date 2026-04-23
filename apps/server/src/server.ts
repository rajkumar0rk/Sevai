import app from './app.js'
import { PORT } from '@/constants/env.js'



app.listen(PORT,()=>{
  console.log("Server listening on port ",PORT)
})
