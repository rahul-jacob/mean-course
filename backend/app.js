const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./model/post');

/*Now we want to use express, one such way of using it is to add one such route only or handling a
single special path only. We do this by first creating an express app.
*/
const app = express();
/*
//Establishing connection with DB using Mongoose
*/
mongoose.connect("mongodb+srv://userone:kO2YfautKhIpPfpE@cluster0.dkthb.mongodb.net/test?retryWrites=true&w=majority")
  .then(()=>{
    console.log("Connected to Db");
  })
  .catch((e)=>{
    console.log("Error Occured while connection to Db ");
    console.log(e);
  });


app.use(bodyParser.json());//this will return a valid express middleware for parsing JSON data.
app.use(bodyParser.urlencoded({extended : false}));

/* ########## CORS Origin Fix By Adding Appropriate Headers --Beg ########## */
app.use((req,res,next) => {
//The below header Access-Control-Allow-Origin specifies no matter which domain the app which is sending the request is running
//on it's allowed to access our resources.
  res.setHeader("Access-Control-Allow-Origin","*");

//This below header "Access-Control-Allow-Header" restricts to the domains sending requests with a certain set of headers besides
//the default Headers there are default headers like the brower and so on but we also want to allow
//some extra headers such as "Origin","X-Requested-With","Content-Type","Accept" you can add more or
//remove some; what these headers essentially mean is the incomming request may have these extra
//headers. Its not mandatory that a request should have all the default headers if it has it will
//allowed if it does not have its still allowed. But if the request contains a non-default header
//i.e header that are not defined here then the access would be blocked.
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");

 //The below header "Access-Control-Allow-Methods" and here we control the Http Verbs may be used
 //to send request. Here we want to allow "GET" ,"POST","PATCH" ,"DELETE","OPTIONS"
 //Now we should be able to sent the request.
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
  next();
});
/* ########## CORS Origin Fix By Adding Appropriate Headers --End ########## */

app.delete("/api/posts/:id",(req, res, next)=>{
  console.log(1);
  console.log("The request parameter is "+req.params.id);
  console.log(2);
  const deletePost = new Post({
    _id : req.params.id
  });
  console.log("3 printing json request "+deletePost);
  deletePost.deleteOne(deletePost)
    .then((result) => {
      console.log("4 result is "+result);
      res.status(200).json({
        message : "Post Deleted with the id " +req.params.id
      });
      console.log(6);
    });

  console.log(7);
});

app.post("/api/posts",(req, res, next) => {
  //How can we retrieve data attached to a request. for this we install a package body-parser which
  //help us to retrieve data from the from the request.
  console.log("Added a post");
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log("Adding a post "+post);
  post.save()
    .then((postData) => {
      console.log(postData);
      res.status(201).json({
        id : postData._id,
        title : postData.title,
        content : postData.content
      });
    });
});

app.get('/api/posts',(req, res, next) => {
  const posts = Post.find({})
    .then((postList) => {
      console.log(postList);
      res.status(200).json({
        message: "Data received from the server",
        posts : postList
      });
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
