const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg')
const db = require('../dbconfig.js')

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../react-client/dist'));

//route to save current layout to postgres database
app.post('/api/diagrams', function (req, response) {

  const client = new Client({
      host: db.host,
      database: db.database,
      port: db.port,
      user: db.username,
      password: db.password
    })
    client.connect((err) => {
      if (err) {
        console.error('connection error', err.stack)
      } else {
        console.log('connected')
      }
    });
  let values = [req.body];
  client.query('INSERT INTO savedfloorplans (floorplan) VALUES ($1)', values, (err, res) => {
    if (err) throw err
    client.end();
    response.end();
  })
});

app.get('/api/diagrams', function (req, response) {

  const client = new Client({
      host: db.host,
      database: db.database,
      port: db.port,
      user: db.username,
      password: db.password
    })
    client.connect((err) => {
      if (err) {
        console.error('connection error', err.stack)
      } else {
        console.log('connected')
      }
    });

  client.query('SELECT * FROM savedfloorplans ORDER BY id DESC LIMIT 5', (err, res) => {
    if (err) throw err
    client.end();
    console.log(res.rows[0]);
    response.send(JSON.stringify(res.rows[0]));
    response.end();
  })
});

app.listen(port, function() {
  console.log(`LISTENING ON PORT ${port}!`);
});


//Store preconfigured layouts in database