const http = require('http');
const app = require('./backend/app')//contnue 5.13

const port = process.env.PORT || 3000;
app.set('port',port);
const server = http.createServer(app);//We need to mention the port of the express server


server.listen(port);

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
