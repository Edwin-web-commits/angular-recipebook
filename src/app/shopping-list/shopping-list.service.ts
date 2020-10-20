import {Ingredient} from '../shared/ingredient.model'
import { Subject } from 'rxjs';

export class ShoppingListService{

    onIngredientsChanged=new Subject<Ingredient[]>(); 
    itemToBeEdited=new Subject<number>();

    private ingredient:Ingredient[]=[
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10),]

        getIngredients()
        {
            return this.ingredient.slice(); //return copy of the array. Any change made in the original array ( ingredient) will not be reflected in this array 
        }
     //This function will return an ingredient of the current clicked item
        ingredientTobeEdited(index:number){
          return this.ingredient[index];
        }

        ingredientTobeDeleted(index:number){
          this.ingredient.splice(index,1); //deleting i item at the position of index
          this.onIngredientsChanged.next(this.ingredient.slice());
        }

        updateIngredient(index:number,newIngredient:Ingredient){
          this.ingredient[index]=newIngredient;
          return this.onIngredientsChanged.next(this.ingredient.slice());
        }

        addIngridients(myIngridient: Ingredient){
          this.ingredient.push(myIngridient);
          this.onIngredientsChanged.next(this.ingredient.slice()); //whenever a new ingredient is added to the ingredient array ,we want to emit the copy of the original array
         }

          addIngredientsToShoppingList(ingredients: Ingredient[]){
 
            // for(let ingredien of ingredients){
            //     this.addIngridients(ingredien);
            // }
        this.ingredient.push(...ingredients); //converting an array into a list
        this.onIngredientsChanged.next(this.ingredient.slice());
      }

}