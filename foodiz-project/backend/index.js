
const express = require('express')
const app = express()
const port = 3000
const mongoDB=require('./db');
const cors =require('cors')
mongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(cors({
  origin:'http://localhost:5173'
}))
  
app.use(express.json())
const createUserRouter = require('./Routes/createUser.js');

app.use('/api', createUserRouter);
app.use('/api', require('./Routes/displayData.js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// app.use((req,res,next)=>{
//   res.setHeader('Access-Control-Allow-Origin','http://localhost:5173/Signup');
//   res.header(
//     'Access-Control-Allow-Header',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// })

