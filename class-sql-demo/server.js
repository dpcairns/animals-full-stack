require('dotenv').config();

const client = require('./lib/client');

// Initiate database connection
client.connect();

const app = require('./lib/app');

const PORT = process.env.PORT || 7890;

// get all animals
app.get('/animals', async(req, res) => {
  const data = await client.query('SELECT * from animals');

  res.json(data.rows);
});

// get JUST ONE animal
app.get('/animals/:id', async(req, res) => {
  const id = req.params.id;
  const data = await client.query(
    'SELECT * from animals where id=$1',
    [id]
  );

  
  res.json(data.rows[0]);
});

// create a animal
app.post('/animals/', async(req, res) => {
  console.log('=============================\n');
  console.log('|| req.body', req.body);
  console.log('\n=============================');
  try {
    const data = await client.query(
      `insert into animals (name, artist, length, user_id, is_single)
      values ($1, $2, $3, $4, $5)
      returning *;`,
      [req.body.name, req.body.artist, req.body.length, 1, req.body.is_single]
    );
    
    res.json(data.rows[0]);
  } catch(e) {
    console.error(e);
    res.json(e);
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});
