require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

console.log('Connecting to DB...');
console.log(`Host: ${process.env.DB_HOST}`);
console.log(`User: ${process.env.DB_USERNAME}`);

client.connect()
  .then(() => {
    console.log('Connected successfully!');
    return client.end();
  })
  .catch(err => {
    console.error('Connection failed!');
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    console.error('Error code:', err.code);
    if (err.code === '28P01') console.error('Hint: Password authentication failed.');
    if (err.code === '28000') console.error('Hint: Invalid authorization specification.');
    if (err.code === 'ECONNTIMEOUT') console.error('Hint: Connection timed out (Firewall/SG issue).');
  });
