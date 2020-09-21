const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");

/*
Once this is done we need to wire up this express app with our server here where we are listening to
Now to we need to export this for this we have a module object which has an export object and we
regitster what we want to export as parameter. So here we want to export the entire app. Now we need
to import it in our server.js
  const app = require(path of the file)

  Now we will use this app as a listener for incomming requests and all that has be be done for that
  we pass it to create a server.
  we replace the below code with
        const server = http.createServer((req, res) =>{
          res.end('This is my first Response');
        });

        const server = http.createServer(app);
        we also need to mention the port number of our express server.
        restart our node server and see the output.
 */



const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
