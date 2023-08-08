const app = require("./app.js");

async function main() {
  const port = process.env.PORT || 3000;
  try {
    app.listen(port);
    console.log("Server is listening on port ", port);
  } catch (error) {
    console.log("Unable to connect to the database");
  }
}

main();
