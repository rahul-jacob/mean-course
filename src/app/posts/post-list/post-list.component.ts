import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';

/*
    As we know subscribe method has 3 arguments, in this case we are only using the first argument
    which is the function that is executed after a value is emitted. so i use the arrow operator
      (posts :Post[]) =>{
        this.posts = posts;
      }
    Now i can set this.posts = posts; the value which i just received from the listener.

    Now one more important thing, this subscription here actually does not cancel whenever this
    component is teared down. Now this component does not disappears because we got only in one page
    we get no way of removing this component from the UI. But if there are more components we may
    remove one component so that the other component is active. So we want to ensure that whenever
    this component is not part of the DOM the subscriptions which we have set up in it are also not
    living anymore otherwise we create a memory leak. So we will actually store that subscription in
    a new property which will be of type Subscription importing from rxjs module.
    Now i will create a new property of Subscription type
        private postSubb: Subscription;
        and  on ngOnInit i will define the postSubb and assign the subscribe to subscription.
        this.postSubb = this.postService.getPostUpdatedListener().subscribe((posts: Post[]) => {
          this.posts = posts;
        });
    Now once we are removing the component we just need to unsubscribe whenever this component is
    destroyed and there is another lifecycle hook we can use we add the onDestroy() method
    and in the ngOnDestroy() method we call unSubscribe() on the Subscription and prevent memory leak

        ngOnDestroy(){
          this.postSubb.unsubscribe();
        }

*/

@Component({
  selector : 'app-post-list',
  templateUrl : './post-list.component.html',
  styleUrls : ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{

  @Input() posts=[];
  postService: PostService;
  postSubb: Subscription;

  constructor(postService: PostService){
    this.postService = postService;
  }

  ngOnInit(): void {
    console.log("12345");
    this.postService.getPost();
    this.postSubb = this.postService.getPostUpdatedListener().subscribe((posts: Post[])=>{
      this.posts = posts;
    });
  }
  ngOnDestroy(): void {
    this.postSubb.unsubscribe();
  }

  onDelete(id : string){
    console.log("1");
    console.log("id is "+id);
    this.postService.deletePost(id);
    console.log("2");
  }
}
