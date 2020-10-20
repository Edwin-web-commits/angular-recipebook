import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{ HeaderComponent} from'./header/header.component';
import { from } from 'rxjs';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';

import { AuthInterceptorService} from './auth/auth-interceptor.service';

// import {  RecipesModule } from './recipes/recipes.module';
//import { ShoppingListModule } from './shopping-list/shopping-list.module';
// import { AuthModule } from './auth/auth.module';
import {SharedModule } from './shared/shared.module';




@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
   /*RecipesModule, */  // does not have to be imported anymore since we are loading it through app-routing.module.ts via lazy loading.Importing it here will 
    //mean that we are both laoding it lazily and eagerly which is not a good thing

    /*ShoppingListModule,*/  // does not have to be imported anymore since we are loading it through app-routing.module.ts via lazy loading.Importing it here will 
    //mean that we are both laoding it lazily and eagerly which is not a good thing


    /*AuthModule,*/  // does not have to be imported anymore since we are loading it through app-routing.module.ts via lazy loading.Importing it here will 
    //mean that we are both laoding it lazily and eagerly which is not a good thing
    
   
  ],
  providers: [ShoppingListService,RecipeService,
  {provide: HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
