const connnectedToMongo = require('./dbconnection')
const express = require('express')
const multer = require('multer')


connnectedToMongo()

const app = express()
const port = 5000


app.use(express.json())

const filestorage= multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"./images")
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+' || '+file.originalname)
  }
})

const upload=multer({storage:filestorage})
app.use('/api/auth', require('./routes/auth'))
// app.use('/app/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})