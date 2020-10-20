import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit, OnDestroy {

 public ingredients=[];
 private igChangeSub: Subscription;
 
 //dittingItem=
 


  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(){
    this.ingredients=this.shoppingListService.getIngredients();


    //subscribe to the ingredientChanged event and get the ingredient array and set it equal to the original array of ingredients
    // store the subscribtion in a variable of type Subscription so that you can be able to clean it up when leaving the component
     this.igChangeSub= this.shoppingListService.onIngredientsChanged.subscribe( (myingredient: Ingredient[])=>{
      this.ingredients=myingredient;
    });
    
    
  }
  
   myIngridients(ingridInfo:Ingredient){
    this.ingredients.push(ingridInfo);
   }

   //emit the index of the current clicked item
   onEditItem(index:number){
     this.shoppingListService.itemToBeEdited.next(index);
   }

  

 ngOnDestroy(): void{
   this.igChangeSub.unsubscribe(); //cleaning up or destroying the component when leaving the component.
 }


}
