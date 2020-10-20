import { NgModule } from '@angular/core';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipesRoutingModule } from './recipes-routing.modules';
import { SharedModule } from '../shared/shared.module';


@NgModule({

    declarations:[
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent
    ],

    //whatever you use in templates( directives,pipes, e.t.c) of the components you declared above has to be imported in that module (RecipesModule in this case).
    //The only exception to that rule is for services,since services only need to be set up once in the app module and
    // you can access them in your whole app even in componets that you added to feature modules

    imports:[
       
        ReactiveFormsModule,
        CommonModule, //for accessing *ngFor and *ngIf ...
        RecipesRoutingModule,
        SharedModule
    ],
    
     ///export the all components that we declared above so that we cannot only use them in the recipes module but also in other 
     //modules that import recipes module
   /* exports:[
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ]
    */
   //for now there is no need to export all the recipes components because now we are only using them internally
   // in the recipes module. We are using them either embedded into other components (above declared components) or by loading them through the recipe routing module
   //So there is no reason to export these recipes components because we are not using these recipes components in
   //the App component or any child component of the app component

})
export class RecipesModule {

}