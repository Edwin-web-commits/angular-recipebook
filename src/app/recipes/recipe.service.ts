import {Recipe} from './recipe.model'
import { Injectable, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';


@Injectable()
export class RecipeService {

  recipeChanged=new Subject<Recipe[]>();

  constructor(private shoppinList:ShoppingListService){}

  private recipes: Recipe[]=[];
  /*
    private recipes: Recipe[]=[
         new Recipe('Cheese Burger','Cheese burger with steak', 'https://table.skift.com/wp-content/uploads/2017/11/burger-gourmet-cheeseburger-3000x3000-e1511824405753.jpg',[new Ingredient('Steak',1), new Ingredient('Sausage',2)]),
        new Recipe('Roman Pizza','Pizza with eggs and tomatoe', 'https://www.funktionevents.co.uk/images/pictures/new/6-blog/best-resturants-in-glasgow-romans-pizzeria-bar-(content-max-breakpoint-width).jpg?v=dbcaa0af&mode=h',[new Ingredient('Eggs',4),new Ingredient('Tomatoes',1)])
      ];
      */
      
      //this method will overrite the recipes array. It will get its array of recipes in the data-storage service
      // from the server
      setRecipe(recipe:Recipe[]){
       this.recipes=recipe;
       this.recipeChanged.next(this.recipes.slice());
      }
      getRecipes(){
          return this.recipes.slice();
      }
      getRecipe(index: number){
        return this.recipes[index]
      }

      addRecipe(recipe:Recipe)
      {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice())
      }
      updateRecipe(index:number, newRecipe:Recipe)
      {
        this.recipes[index]=newRecipe;
        this.recipeChanged.next(this.recipes.slice())

      }
      onAddIngredientToShoppingList(ingredients: Ingredient[]){
        this.shoppinList.addIngredientsToShoppingList(ingredients);
      }
      onDeleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());

        

      }

}