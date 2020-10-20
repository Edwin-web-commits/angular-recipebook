import { Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import {Recipe} from './recipe.model';
import {DataStorageService} from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
    providedIn:'root'
})

//A resolver is essentially a code that runs before a route is loaded to ensure that the data that the route depends on is there
export class RecipeResolverService  implements Resolve<Recipe[]>{

    constructor(private dataStorageService: DataStorageService,private recipeService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state:RouterStateSnapshot)
    {   const recipes=this.recipeService.getRecipes();
        //if we do not have recipes ,fetch recipes from server
        if(recipes.length===0){
            return this.dataStorageService.fetchRecipes(); // the resolver will subscribe for automatically us to basically find out ones the data is there 
        }
        else{
            return recipes;
        }

    }

}