import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';

/*
app-routing.module.ts is created in the root directory of our angular project.
we export a class called AppRoutingModule. And since its an angular module , we need to put an entry in
out app.module.ts file under the imports section.

So in the AppRouteModule we will decorate it with the @NgModule because its an angular module and here
we want to use another feature of angular package and that other feature will be the route module.
The router module is imported from the @angular/router and as the name suggests this module helps us
with routing, it actually enables the angular router and its able to handle a router configuration and
therefore let the angular router do its job. With out this we can't use the angular router.

What is a route? - A route is a javascript object where we define for which url which part of our app
should be presented. We therefore create a new constant viz routes which is of type Routes and this
is imported from angular router package @angular/router. this constant holds an array of javascript
objects and each object has to have a certain structure. It need to have a path property and this path
defines which part after our domain we want to load a certain page. And if this path is empth then it
means the main page / starting page. i.e our domain slash nothing. eg: http://localhost:8080/
After path the next property is component - which determines which component should get loaded so for
this i pass the component type what we want to load. This means that we have to import it here.
Now for eg if i want to load our post-list component i should write
  const routes : Routes =[
    {
      path : '', component : PostListComponent
    },
    { /*note when you are defining a path don't give /create only give create.**************
      path : 'create', component : PostCreateComponent
    },
  ];
//////////////note when you are defining a path don't give /create only give create.
Now we need to infom anguar router that this is our module of routes and we do that by first of all
importing with the import statement in the module by importing the router module into the angular module
So we have to provide the RouterModule and this router module has a method forRoot() which accepts a
parameter an array of Router[] i.e our route root config. So we pass RouterModule.forRoot(routes)
And finally we have to export this Routing module so that we can include it in our app.module.ts and
when the app get's started we have the route config also up and ready.
Now all we have to do is provide a marking or a place where angular should load the active routes and
for that we will go to our app component template right now we have the post-create and post-list component
above each other. I don't want both the post-create and post-list instead they should be loaded through
angular router. So i will delete both the <app-post-create> and <app-post-list> and provide a hook for
the angular router where it can render its content  and this hook can be created with the router outlet
<router-outlet> directive which is provided by the angular router package and since we have the router
module imported into angular module, indirectly through the app routing module .
Now we stop and restart our app.
we can access the pages in the following manner
http://localhost:4200/ - lists the post list page
http://localhostL4200/create - list the post create page.
The header is present all the pages because that is share by all the part of the application because
the header is outside of the <router-outlet>. so we swap the list of post and the post create screen
inside our router hook <router-outlet> directive.

Now we will configure these links in our header page.

*/
const routes: Routes = [
  {
    path : "",
    component : PostListComponent
  },
  {
    path : "create",
    component : PostCreateComponent
  },
  {
    path: "edit/:postId",
    component: PostCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
