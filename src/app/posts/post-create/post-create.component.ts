import { Component, OnInit } from '@angular/core';

import { FormGroup,FormControl, Validators} from '@angular/forms';
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
  /*
  Form Group is the top level of Form. It groups all the controls of a form. We can also have
  sub-groups in a form if you want to well then group controls with in a form but the form overrall
  is just one big group and we need to initialize and define the controls we have.
  So we create a new form group and this form group (constructor) accepts a java script object and
  here we configure our form.
  Now we can define key - value pairs which can define your control. So for eg. if we want to add our
  title control
      this.form = new FormGroup({
        'title': new FormControl()
      })
  we give the first control which is our title 'title' and here we turn this into a new FormControl
  FormControl is another constructor which is imported from @angular/forms. This FormControl creates a
  single controller in the form and FormControl takes in a couple of arguments.
   - The first argument is the begining form state and i will start null by default to have an empty
   input
   - The second argument allows us to attach validators or in general, formcontrol op tions such options
   would be Javascript object and in that object we can define things like asynchronous validators
   which are validators that take time to finish and we'll add such an asynchronous validator later
   when we create a validator for the mime of the type file when we try upload. We also got synchronous
   validators and we will add some of these validators for eg requiring title,
   validator is an array of validators. Angular has some pre-defined validators present in Validators
   class in @angualr/forms. And we can access pre-defined validators by accessing their method.
      this.form = new FormGroup({
        'title': new FormControl(null, {
            validators: [Validators.required, Validators.minLength(3)]
        }),
        'content': new FormControl(null,{
          validators: [Validators.required]
        })
      });



  */
  public form: FormGroup;


  constructor(postService: PostService, route: ActivatedRoute){
    this.postService = postService;
    this.route = route;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'title': new FormControl(null,{
        validators: [Validators.required,Validators.minLength(3)]
      }),
      'content': new FormControl(null,{
        validators: [Validators.required]
      })
    });
    /*
    What we are missing here is the connection of the template and what we are also missing is the part
    where we can pre-populate these controls with concrete values in case we are editing a post because
    we always set the starting values to null but that of course is only correct when if we are creating
    a new post.
    Now to set an initial value we can go to our subscription here where we got our post data then we
    can reach out to our form which we initialized and call setValue() here. setValue() allows you to
    override the values of your form control. So you pass a javascript object here and you need to set
    a value for every formcontrol.
        this.form.setValue({
          'title' : this.post.title,
          'content': this.post.content
        })
    Now we are going to connect or synchronize the template and our typescript. So we tell angular which
    input in the html file relates to which control where created in typescript because you could argue
    that the title control should obviously be that input because it has the name title, but angular
    does not infer this it gives you the flexibality of defining no name (name=title) here, you can now
    remove that or a different name so instead of relying on the name attribute what you do instead is
    you add a special directive here before that first of all you add a directive to your averall form,
    the formGroup directive, this formGroup directive takes your form object defined in typescript. It
    takes this and basically tells angualr hey for the form i created in typescript this is the html.
    And here on the input i can use a different directive formControlName and type the name of the
    control as we defined it in typescript. So now we connectet our input to our form control.
    */
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
            this.form.setValue({
              'title': this.postObj.title,
              'content': this.postObj.content
            });
            this.isLoadingFlag = false;
          });

      }else{
        this.mode = 'create';
        this.postId = null;
      }
    });

  }
  /*
  Now we no longer get the form as an argument, instead we have have our own form object registered on
  our or as a property in our class so we access it using this.form
  Then we use the value property of the control to get the values entered by the user
      this.form.value.title
      this.form.value.content
  */
  onSavePost(){
    console.log("In post added method PostAdded! Beg");
      if(!this.form.invalid){
      /*const post: Post = {
        title:postForm.value.title,
        content:postForm.value.content
      };*/
      console.log("mode is ",this.mode);
      this.isLoadingFlag=true;
      if(this.mode === 'create'){
        this.postService.addPost(this.form.value.title,this.form.value.content);
      }else{
        this.postService.updatePost(this.postId,this.form.value.title,this.form.value.content);
      }
    }else{
      return;
    }
    this.form.reset();
    console.log("In post added method PostAdded! End");
  }
}
