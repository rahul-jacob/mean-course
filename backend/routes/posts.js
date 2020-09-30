const express = require("express");
/**
 Now we create the express router by creating a new constant
                    const express = require("express");
 Once we get the router object we will define our routes just like we did using router in routers.js file.
 So we copy all the api's related to post and past it here. we replace the router with router

 And finally we need to export the router to make express aware of it. For that we use the node module
 export syntax
 module.exports = router;

 With this we have exported the router module. now we need to import it into our app.js so that we can
 again make our main express app aware of this extra routes because right now all our extra routes
 would fail.
 So in the app.js file we need provide the import
 const postRoutes = require("./routes/posts")
 Now our router object is imported and all the post related routes are stored in the postRoutes and
 now to make express aware of it i can simply call
      app.use(postRoutes);
 */
/*
Further optimizing we can filter all requests that begin with /api/posts/ into the post.js file
this can be done by
    app.use('/api/posts',postRoutes);
and in the post.js file we remove the /api/posts mapping
eg '/api/posts will be modified as ''
   'api/posts/:id will be modified as '/:id'
*/
const router = express.Router();
const Post = require('../model/post');

router.get("/:id",(req,res,next) => {
  Post.findById(req.params.id)
    .then((post) =>{
      if(post){
        res.status(200).json(post);
      }else{
        res.status(404).json({messge: 'Post Not Found'});
      }
    });
});

router.put("/:id",(req, res, next) => {
  console.log("In update post "+req.params.id);
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id },post)
    .then((result) =>{
      console.log("In update post after api call response is ",result);
      res.status(200).json({
        message: 'Updated Post Successfully'
      });
    });
});

router.delete("/:id",(req, res, next)=>{
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

router.post("",(req, res, next) => {
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

router.get('',(req, res, next) => {
  const posts = Post.find({})
    .then((postList) => {
      console.log(postList);
      res.status(200).json({
        message: "Data received from the server",
        posts : postList
      });
    });
});
module.exports = router;
