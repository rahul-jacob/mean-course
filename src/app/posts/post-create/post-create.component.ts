import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector : 'app-post-create',
  templateUrl : './post-create.component.html',
  styleUrls : ['./post-create.component.css']

})

export class PostCreateComponent implements OnInit{
  postService: PostService;
  private route: ActivatedRoute;
  private mode: string = 'create';
  private postId: string;
  public postObj: Post;
  public isLoadingFlag: boolean = false;

  constructor(postService: PostService, route: ActivatedRoute){
    this.postService = postService;
    this.route = route;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      if(param.has('postId')){
        this.mode = 'edit';
        this.postId = param.get('postId');
        //Adding a spinner; setting isLoadingFlag to true
        this.isLoadingFlag = true;
        this.postService.getPostById(this.postId)
          .subscribe((postData) => {
            this.postObj = {id: postData._id,title: postData.title,content:postData.content}
            //Removing a spinner; settting isLoadingFlag to false
            this.isLoadingFlag = false;
          })
      }else{
        this.mode = 'create';
        this.postId = null;
      }
    });

  }

  onSavePost(postForm: NgForm){
    console.log("In post added method PostAdded! Beg");
      if(!postForm.invalid){
      /*const post: Post = {
        title:postForm.value.title,
        content:postForm.value.content
      };*/
      console.log("mode is ",this.mode);
      this.isLoadingFlag=true;
      if(this.mode === 'create'){
        this.postService.addPost(postForm.value.title,postForm.value.content);
      }else{
        this.postService.updatePost(this.postId,postForm.value.title,postForm.value.content);
      }
    }else{
      return;
    }
    postForm.resetForm();
    console.log("In post added method PostAdded! End");
  }
}
