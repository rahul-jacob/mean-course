const express = require('express');

/*Now we want to use express, one such way of using it is to add one such route only or handling a
single special path only. We do this by first creating an express app.
*/

const app = express();

app.use('/api/posts',(req, res, next) => {
  const posts = [
    {
      id : "xyz122A",
      title : "First Post",
      content : "This is from the server Post One"
    },
    {
      id : "a3z122A",
      title : "Second Post",
      content : "This is from the server Post Two"
    },
    {
      id : "hPo1gRa",
      title : "Third Post",
      content : "This is from the server Post Three"
    }
  ];
  res.status(200).json({
    message: "Data received from the server",
    posts : posts
  });
});

module.exports=app;

/*
this app can now be used and the import thing about an express app is actually is just a big chain
of middlewares we apply to incoming requests. So like a funnel through which we sent that express
and every part of that funnel or in that funnel we have different parts and every part can do some
thing with that request, manupulate it, read values from it or do something with the response like
send a response.
*/

/* ##################  Commenting Below Codes --Beg  ########################## */
/*
app.use((req,res,next) => {
  console.log('Level 1 Function');
  next();
});

app.use((req,res,next) => {
  console.log('Level 2 Function');
  next();
});

app.use((req,res,next) => {
  console.log('Ending Response using send()');
  res.send('Response from server');
});
*/
/* ##################  Commenting Below Codes --End  ########################## */

/*
So we add such middleware and with the app we use the 'use' keyword this simply uses a new middleware
on our app and on incoming request. The middleware function the use() function the use function here
is in its simplest form takes a function which is executed for an incoming request and the function
takes in 3 arguments arguments request, request and next.
The next function has one important if you execute it in here like this then the request will actually
continue its journey.
*/

//module.exports=app;

/*
Once this is done we need to wire up this express app with our server here where we are listening to
Now to we need to export this for this we have a module object which has an export object and we
regitster what we want to export as parameter. So here we want to export the entire app. Now we need
to import it in our server.js

If you are not using next() in a filter or function or comment the next() function in function 2 then
we will result in a timeout as the control won't go to the next function.
 */
