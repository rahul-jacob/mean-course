import {Post} from './post.model';
import {Subject} from 'rxjs';

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
export class PostService{

  private posts : Post[] = [];
  private postUpdated = new Subject<Post[]>();

  addPost(title: string, content: string){
    const postObj: Post = {title : title, content : content};
    this.posts.push(postObj);
    this.postUpdated.next([...this.posts]);
  }

  getPostUpdatedListener(){
    return this.postUpdated.asObservable();
  }

  getPost(){
    //return this.posts; //Bad Practice
    return [...this.posts]; //Good Practice,
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
  }
}
