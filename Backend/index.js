const connnectedToMongo = require('./dbconnection')
const express = require('express')



connnectedToMongo()

const app = express()
const port = 5000


app.use(express.json())


app.use('/api/auth', require('./routes/auth'))
app.use('/api/presc', require('./routes/uploadprescrib'))
app.use('/api/presc', require('./routes/prescimage'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
