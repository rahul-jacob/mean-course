import { Component } from '@angular/core';

@Component({
  selector : 'app-post-create',
  templateUrl : './post-create.component.html',
  styleUrls : ['./post-create.component.css']

})

export class PostCreateComponent{

  newPost:String = '';
  displayPost:String = '';

  onAddPost(post:HTMLTextAreaElement){
    this.newPost = post.value;
    this.displayPost= post.value;
    console.log("In post added method PostAdded! ");
  }
}
