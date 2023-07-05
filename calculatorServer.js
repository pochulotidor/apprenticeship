const net = require("net");
const HostName = "localhost";
const Port = 8080;

//creates the server, callback function is triggered once a client is connected
const server = net.createServer((c) => {
    console.log("A client just connected.");
    
    //handles incomming data from the client and also responsible for sending back data to the client.
    c.on("data", async (input) => {
        const userInput = input.toString().trim()
        c.write(`Waiting for response...`);
        try{
           
            c.write(`Your input is ${input}`);
            const answer = await calculate(userInput)
            c.write(`answer is ${answer}`);
           
        }catch(e){
            c.write("Error in your input occurs, please input valid expression")
        }
       
    });

    c.on("end", () => {
        console.log("Client disconnected");
    });
});

//handling server error
server.on("error", (err) => {
    console.error("Server error:", err);
});

//starting the server
server.listen(Port, HostName, () => {
    console.log(`Server listening on ${HostName}:${Port}`);
});


function calculate(input) {
    return new Promise((resolve, reject) => {
        console.log("Calculating...");
        setTimeout(() => {
            const contains = /^[-+*/()\s\d.]+$/;
            if (!contains.test(input)) {
              reject(console.log(new Error("Invalid input")));
            } else {
              try {
                const result = eval(input);
                resolve(result);
                console.log("Calculation completed")
              } catch (e) {
                reject(e);
              }
            }
        }, 2000);
    });
}

//handles the program termination.
const handleTermination = () => {
    console.log("Stopping the server...");
    server.close(() => {
        console.log("Server stopped");
        process.exit();
    });
};

process.on("SIGINT", handleTermination);
process.on("SIGTERM", handleTermination);
