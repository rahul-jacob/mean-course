import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector : 'app-post-create',
  templateUrl : './post-create.component.html',
  styleUrls : ['./post-create.component.css']

})

export class PostCreateComponent{
  postService: PostService;

  constructor(postService: PostService){
    this.postService = postService;
  }

  onAddPost(postForm: NgForm){
    console.log("In post added method PostAdded! Beg");
      if(!postForm.invalid){
      /*const post: Post = {
        title:postForm.value.title,
        content:postForm.value.content
      };*/
      this.postService.addPost(postForm.value.title,postForm.value.content);
    }else{
      return;
    }
    postForm.resetForm();
    console.log("In post added method PostAdded! End");
  }
}
