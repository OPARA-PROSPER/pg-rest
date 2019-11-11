const pg = require('pg');

const config = {
  user: 'kodekage',
  database: 'rest_pg',
  password: 'oparaprosper081',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 500000,
};

const pool = new pg.Pool(config);
pool.on('connect', () => {
  console.log('connected to the Postgress Database');
})

const createTables = () => {
  const schoolTable = ` CREATE TABLE IF NOT EXISTS
  students(
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    age INT NOT NULL,
    class VARCHAR(128) NOT NULL,
    guardian_contact VARCHAR(128) NOT NULL,
    admission_date VARCHAR(128) NOT NULL
  )`;

  pool.query(schoolTable).then((res) => {
    console.log(res);
    pool.end();
  }).catch((error) => {
    console.log(error);
    pool.end();
  })
};

pool.on('remove', () => {
  console.log('Client Removed!');
  process.exit(0);
});

module.exports = {
  createTables,
  pool,
}

require('make-runnable');
