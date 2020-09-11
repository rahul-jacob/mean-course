import { Component,EventEmitter,Output } from '@angular/core';
import {Post} from '../post.model';
@Component({
  selector : 'app-post-create',
  templateUrl : './post-create.component.html',
  styleUrls : ['./post-create.component.css']

})

export class PostCreateComponent{

  enteredTitle:string = '';
  enteredContent:string = '';
  @Output() createdPost = new EventEmitter();

  onAddPost(){
    console.log("In post added method PostAdded! Beg");
    const post: Post={
      title:this.enteredTitle,
      content:this.enteredContent
    };
    this.createdPost.emit(post);
    console.log("In post added method PostAdded! End");
  }
}
