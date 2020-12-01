const express = require('express')
const app = express()
const port = 2394
const bdd = ""

var stable = require('./hms_stable.js')

app.use('/stables', stable);

app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/horses',(req, res) => {
    res.send('on GET /horses')
})

app.get('/horse',(req, res) => {
    res.send('on GET /horse So only one horse with name or id')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})