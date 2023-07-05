const net = require("net");
const readline = require("readline");

const HostName = "localhost";
const Port = 8080;

//establishing our connection to the server, callback function is executed once connection is established.
const client = net.createConnection(Port, HostName, () => {
  console.log("Establishing connection to the server....");

  setTimeout(()=> {
    console.log("Connection is established.")

  }, 1000)
 
});

//it handles incomming data from the server
client.on("data", (data) => {
  console.log(data.toString());
});

client.on("close", () => {
  console.log("Connection destroyed.");
});

//interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//sending the user input to the server
rl.on("line", (input) => {
  client.write(input.trim());
});

//when the program is interupted, closes the input interface and the connection to the server.
rl.on("SIGINT", () => {
  rl.close();
  client.end();
});

process.on("SIGINT", () => {
  rl.close();
  client.end();
});
