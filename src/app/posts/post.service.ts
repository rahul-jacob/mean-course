import {Post} from './post.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

/*
    There are two ways to make Angular about our Service.
    1. app.module.ts
    Go to app.module.ts and add your service in providers array. providers are for services.
    providers: [PostService]
    provide the import of PostService too. This would allow angular to find that service.

    2. Add Anotation @Injectable in PostService
    @Injectable({providedIn : 'root'})
    export class PostService{}
    Make sure you should not miss type 'root' because its important. What it does is the same it
    provides in the root level and this not only angular finds this but also means same is the case
    you added in the providers array.
    What angualr does is it finds it and it does create only one instance of the service for the
    entire app.
*/
@Injectable({providedIn : 'root'})
export class PostService{

  private posts : Post[] = [];
  private postUpdated = new Subject<Post[]>();
  private router: Router;
  //In order to navigate programatically we use the Router module. this router module has a
  //method navigate which accepts an array of string router.navigate(["/"])
  constructor(private http: HttpClient, router: Router) {
    this.router = router;
  }

  updatePost(id: string, title: string, content: string){
    console.log("in update post ",id);
    const post: Post = {
      id: id,
      title: title,
      content: content
    }
    this.http.put("http://localhost:3000/api/posts/"+id, post)
      .subscribe((returnData)=>{
        console.log('Update Post response ',returnData);
        const postList = [...this.posts];
        const objectIndex = postList.findIndex(obj => obj.id === post.id);
        postList[objectIndex] = post;
        this.posts = postList;
        this.postUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  deletePost(id : string){
    console.log("3");
    this.http.delete("http://localhost:3000/api/posts/"+id)
      .subscribe((returnData) => {
        console.log("4");
        console.log("response from server ",returnData);
        const modifiedPost = this.posts.filter(obj => obj.id !== id);
        console.log("Latest updated post ",modifiedPost);
        this.posts = modifiedPost;
        this.postUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
      console.log("5");
  }

  addPost(title: string, content: string){
    const postObj: Post = {id : null,title : title, content : content};
    console.log(22);
    this.http.post<{id: string, title: string, content: string }>('http://localhost:3000/api/posts',postObj)
      .subscribe((responseData) =>{
        console.log("33",responseData);
        console.log("44 ",responseData.id)
        this.posts.push(responseData);
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdatedListener(){
    //We are commenting the below code to invoke the node api via httpClient
    return this.postUpdated.asObservable();

    //The angular http client deals with observables so for this won't do anything unless we
    //listen to it because if you are not accepting then why would it send the request. Now to listen
    //you need to subscribe and we can pass in 3 arguments one for new data second is for error
    //and third one is for completion. 5:07
  }

  getPost(){
    //return this.posts; //Bad Practice
    //return [...this.posts]; //Good Practice,
    /* but wont get the last added item in posts because we get a new array by copying all the
    elements in original post's array so for rectifying this we use Subject from rsjx package.
    This Subject is similar to our EventEmitter the Subject is instantiated and is updated each time
    when we create a new post. But we need to register this subject as a listener so that each time
    we add a Post the post list will be updated.
    How can we achieve this.....
    The PostUpdated is private so we can't directly access it to prevent other components from
    emitting data with it. So we wil add a new method getPostUpdateListener() and then we will
    return this.postUpdated and then we will use a special method called 'asObservable()' and now
    it returns an object to which we can listen but we can't emit. We can still emit from inside this
    file but not from files which receive their reference with the help of this method.
    So now we get the getPostUpdatedListener() and we can go to our post-list.component again and we
    will still fetch the list of posts at the beginning even though its empty initially but we
    will add a listener to that Subject.
    What we will do is write
      this.getPostUpdatedListener() this will return an Observable object. and then we invoke a
      special method called subscribe()
      this.getPostUpdatedListener().subscribe();
    So subscribe now sets up a subscription and subscribe takes in 3 possible arguments
      1. The first one is a function which get's executed whenever a new data is emitted.
      2. The second argument will be called when ever an error is emitted.
      3. And the third argument will be a function that is called when ever the observable is completed
         whenever there is no more values to be expected.
    */
    /*
      Filtering or changing the response variable _id to id as in our post.model class we defined
      as id but in the db its stored as _id. we can simply convert the data we get back from the
      server before we use it in subscribe, since the htt client of angular uses observables we also
      get many operators that observables offers. Operators are basically functions, actions that we
      can apply to the observable streams or to be precise or through the data we get through these
      streams before the data is ultimately handled in the subscription but still chanined to that
      observable chain. We use the pipe operator to convert our data. Now pipe simply allows us to add
      in such an operator and we can actually pipe in multiple operators.
      Now we need to import Map operator from rxjs/operator. The Map method allows you to transform every
      element of an array into a new element and store them all back into a new array.
    */
   this.http.get<{message:string,posts:any}>('http://localhost:3000/api/posts')
   .pipe(map((postData) =>{
      return postData.posts.map(obj => {
        return {
          id : obj._id,
          title : obj.title,
          content: obj.content
        };
      });
     }))
   .subscribe((transformedPost) =>{
     console.log(transformedPost);
     this.posts = transformedPost;
     this.postUpdated.next([...this.posts]);
   });
  }

  getPostById(postId: string){
    return this.http.get<{_id:string,title:string,content:string}>("http://localhost:3000/api/posts/"+postId);
  }
}
