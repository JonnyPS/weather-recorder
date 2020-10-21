const express = require('express')
const app = express()
const port = 8080;
const initDB = require("./database/create-db");

console.log( initDB.setupDB())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
