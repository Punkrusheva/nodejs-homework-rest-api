const mongoose = require('mongoose')
require('dotenv').config()

const uriDb = process.env.URI_DB

const db = mongoose.connect(uriDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    poolSize: 5,
})

mongoose.connection.on('connected',  () => {console.log("Database connection successful")}
)

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection: ${err.message}`)
  process.exit(1)
})

mongoose.connection.on('disconnected', () => {console.log(`Mongoose disconnected`)}
)

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Connection to DB termination and app closed')
    process.exit(1)
  })
})

module.exports = db