const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'realestate',
    password: 'amsa2019',
    port: 5432
});

module.exports = client;