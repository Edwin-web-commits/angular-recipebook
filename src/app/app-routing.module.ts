import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent} from './auth/auth.component';

const routes: Routes = [
  
  {path: '', redirectTo:'/recipes',pathMatch:'full' },

  //lazy loading RecipesModule when visiting recipes route
  {path:'recipes',loadChildren:()=>import('./recipes/recipes.module').then(myModule => myModule.RecipesModule)},

  //lazy loading AuthModule when visiting auth route since we can have a case where user is already logged in but closed the browser but never logged out
  //so when he returns to the browser we want to lazy load the authModule since he will not need to authenticate
  {path:'auth', loadChildren:()=>import('./auth/auth.module').then(myModule=>myModule.AuthModule)},

  //lazy loading shoppingListModule when visiting shoppingList route since when the user is not authenticated the user can still
  //access the shoppingList route component but cannot reaaly do anything about it,which means it will be rather useless if the user has not authenticated
  {path:'shoppinglist',loadChildren:()=>import('./shopping-list/shopping-list.module').then(myModule=>myModule.ShoppingListModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
