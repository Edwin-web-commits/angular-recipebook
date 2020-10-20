import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import {map,tap,take, exhaustMap} from 'rxjs/operators'; 
import { Recipe} from '../recipes/recipe.model';
import { AuthService } from '../auth/auth-service';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient, private recipeService:RecipeService, private authService:AuthService) { }

  storeRecipes(){
   const recipes=this.recipeService.getRecipes();
   this.http.put('https://recipebookdb-25e87.firebaseio.com/recipes.json',recipes).subscribe(response=>{
     console.log(response);
   });
  }

  fetchRecipes(){
  

      return this.http.get<Recipe[]>('https://recipebookdb-25e87.firebaseio.com/recipes.json').pipe(
     map(recipes=>{
      //JS map below is for transforming the items of an array and returning a transformed array.
      //It takes an arrow function that is executed for every element in the array
      return recipes.map( recipe=>{
        return {...recipe, ingredients:recipe.ingredients ? recipe.ingredients : [] };
            });
      //tap allows us to execute some code  in place without altering the data that is funneld through that observable
    }),tap(recipes=>{
      this.recipeService.setRecipe(recipes)
    }));
    
  }
}
