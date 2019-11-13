const express = require('express');
const bodyParser = require('body-parser');
const { pool } = require('./services/db');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Welcome to node-postgres');
})

app.get('/students', (req, res) => {
  pool.connect((err, client, done) => {
    const query = 'SELECT * FROM students';

    client.query(query, (error, result) => {
      done();
      if(error){
        res.status(400).json({
          status: 'error',
          message: error,
        });
      }
      
      if(result.rows < '1') {
        res.status(404).send({
          status: 'failed',
          message: 'No student information found',
        });
      }else {
        res.status(200).send({
          status: 'success',
          data: result.rows
        });
      }
    })
  });
});

app.post('/students', (req, res) => {
  const data = {
    name: req.body.name,
    age: req.body.age,
    class: req.body.class,
    guardian_contact: req.body.guardian_contact,
    admission_date: req.body.admission_date,
  };

  pool.connect((err, client, done) => {
    const query = 'INSERT INTO students(name, age, class, guardian_contact, admission_date) VALUES($1,$2,$3,$4,$5) RETURNING *';
    const values = [data.name, data.age, data.class, data.guardian_contact, data.admission_date];

    client.query(query, values, (error, result) => {
      done();

      if(error) {
        res.status(400).json({
          status: 'error',
          message: error,
        });
      }

      res.status(202).send({
        status: 'success',
        data: result.rows[0],
      })
    })
  })
})

module.exports = app;

app.listen(port, () => {
  console.log(`Express server live on port:${port}`);
})
