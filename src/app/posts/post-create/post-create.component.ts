import { Component,EventEmitter,Output } from '@angular/core';

@Component({
  selector : 'app-post-create',
  templateUrl : './post-create.component.html',
  styleUrls : ['./post-create.component.css']

})

export class PostCreateComponent{

  enteredTitle:String = '';
  enteredContent:String = '';
  @Output() createdPost = new EventEmitter();

  onAddPost(){
    console.log("In post added method PostAdded! Beg");
    const post={
      title:this.enteredTitle,
      content:this.enteredContent
    };
    this.createdPost.emit(post);
    console.log("In post added method PostAdded! End");
  }
}
