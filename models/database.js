const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:3001/studydb';


const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE items(id SERIAL PRIMARY KEY, user VARCHAR(40) not null, nick_name varchar(40))', (err, res) => {
    /* etc, etc */
    if (err) {
        console.log(err);
    } else {
        console.log(res)
    }
  });
//   assert(query === undefined)
// query.on('end', () => { client.end(); });
