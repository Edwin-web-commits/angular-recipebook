import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('f',{static:false}) ingridientsForm:NgForm;

  subcription: Subscription;
  editMode=false;
  ingridientToBeEdited:Ingredient;
  edittedItemIndex:number;




  constructor(private shppingListservice: ShoppingListService) { }

  ngOnInit(){
    this.subcription=this.shppingListservice.itemToBeEdited.subscribe((index:number)=>{
      this.editMode=true;
      this.edittedItemIndex=index;
      this.ingridientToBeEdited=this.shppingListservice.ingredientTobeEdited(index);
     
      //set values current clicked ingredient item to the form controls
      this.ingridientsForm.setValue({
        name:this.ingridientToBeEdited.name,
        amount:this.ingridientToBeEdited.amount,
      });

    });
  }
  onAddItem(form:NgForm){

    const value=form.value;
    const newIngridient=new Ingredient(value.name,value.amount);

    if(this.editMode){
      this.shppingListservice.updateIngredient(this.edittedItemIndex,newIngridient);
    }
    else{ this.shppingListservice.addIngridients(newIngridient);
    }
    this.editMode=false;
    this.ingridientsForm.reset();
   
  } 
  onClear(){
    this.ingridientsForm.reset();
    this.editMode=false;
  }
  onDelete(){
   this.onClear();
    
    this.shppingListservice.ingredientTobeDeleted(this.edittedItemIndex);
  }

}
