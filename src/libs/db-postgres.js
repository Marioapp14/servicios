const { Client } = require("pg");

async function getConnection() {
  const client = new Client({
    // create a new client
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "admin",
    database: "servicios",
  });

  await client.connect();
  return client;
}
module.exports = { getConnection };
