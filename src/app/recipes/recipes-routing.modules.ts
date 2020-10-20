
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeResolverService} from './recipe-resolver.service';
import {AuthGuard } from '../auth/auth.guard';

const routes: Routes=[
    // path:'' ,since this module will be loaded through lazy loading 
    { path: '',component:RecipesComponent, canActivate:[AuthGuard],children:[
        { path: '', component:RecipeStartComponent },
        { path: 'new', component:RecipeEditComponent},
        { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
        { path: ':id/edit', component:RecipeEditComponent,resolve: [RecipeResolverService]},
      ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]

})

export class RecipesRoutingModule {}
