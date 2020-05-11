require('dotenv').config();

const client = require('./lib/client');

// Initiate database connection
client.connect();

const app = require('./lib/app');

const PORT = process.env.PORT || 7890;

app.get('/animals', async(req, res) => {
  const data = await client.query(`
    SELECT animals.id, animals.name, species.species, animals.cool_factor
    from animals
    join species
    on animals.species_id = species.id
  `);
  

  res.json(data.rows);
});


app.get('/species', async(req, res) => {
  const data = await client.query('select * from species');
  
  res.json(data.rows);
});


app.get('/animal/:id', async(req, res) => {
  const data = await client.query(`
    SELECT animals.id, animals.name, species.species, animals.cool_factor
    from animals
    join species
    on animals.species_id = species.id
    where animals.id = $1
  `, [req.params.id]);
  

  res.json(data.rows[0]);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});

module.exports = app;
