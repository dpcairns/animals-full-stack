const client = require('../lib/client');

// async/await needs to run in a function
run();

async function run() {

  try {
    // initiate connecting to db
    await client.connect();

    // run a query to create tables
    await client.query(`
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(256) NOT NULL,
                    hash VARCHAR(512) NOT NULL
                );   
                CREATE TABLE species (
                    id SERIAL PRIMARY KEY,
                    species VARCHAR(256) NOT NULL
                );        
                CREATE TABLE animals (
                    id SERIAL PRIMARY KEY NOT NULL,
                    name VARCHAR(512) NOT NULL,
                    cool_factor INTEGER NOT NULL,
                    species_id INTEGER NOT NULL REFERENCES species(id),
                    owner_id INTEGER NOT NULL REFERENCES users(id)
            );
        `);

    console.log('create tables complete');
  }
  catch(err) {
    // problem? let's see the error...
    console.log(err);
  }
  finally {
    // success or failure, need to close the db connection
    client.end();
  }

}
