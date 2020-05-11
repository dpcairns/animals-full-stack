const client = require('../lib/client');
// import our seed data:
const animals = require('./animals.js');
const usersData = require('./users.js');
const speciesData = require('./species.js');

run();

async function run() {

  try {
    await client.connect();

    await Promise.all(
      speciesData.map(species => {
        return client.query(`
                      INSERT INTO species (species)
                      VALUES ($1)
                      RETURNING *;
                  `,
        [species.species]);
      })
    );

    const users = await Promise.all(
      usersData.map(user => {
        return client.query(`
                      INSERT INTO users (email, hash)
                      VALUES ($1, $2)
                      RETURNING *;
                  `,
        [user.email, user.hash]);
      })
    );
      
    const user = users[0].rows[0];

    await Promise.all(
      animals.map(animal => {
        return client.query(`
                    INSERT INTO animals (name, cool_factor, species_id, owner_id)
                    VALUES ($1, $2, $3, $4);
                `,
        [animal.name, animal.cool_factor, animal.species_id, user.id]);
      })
    );
    

    console.log('seed data load complete');
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}
