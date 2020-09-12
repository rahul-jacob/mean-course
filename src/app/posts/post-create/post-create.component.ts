import { Component,EventEmitter,Output } from '@angular/core';
import {Post} from '../post.model';
import { NgForm } from '@angular/forms';
@Component({
  selector : 'app-post-create',
  templateUrl : './post-create.component.html',
  styleUrls : ['./post-create.component.css']

})

export class PostCreateComponent{

  @Output() createdPost = new EventEmitter();

  onAddPost(postForm: NgForm){
    console.log("In post added method PostAdded! Beg");
      if(!postForm.invalid){
      const post: Post = {
        title:postForm.value.title,
        content:postForm.value.content
      };
      this.createdPost.emit(post);
    }else{
      return;
    }
    console.log("In post added method PostAdded! End");
  }
}
