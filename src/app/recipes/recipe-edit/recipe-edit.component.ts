import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

   id: number;
   editMode=false;
   recipeForm:FormGroup;

  constructor(private route:ActivatedRoute, private recipeService:RecipeService,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{

      this.id=+params['id'];
      if(params['id'] !=null){
        this.editMode=true;
      
      }else{
        this.editMode=false;
        
      }
      this.initForm();
    });
  }
   

  private initForm(){
    
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';

    let recipeIngredients=new FormArray([]);

    if(this.editMode)
    {
      //from the recipeService we get the recipe with of the current selected recipe item and retrieve its values 
      const recipe=this.recipeService.getRecipe(this.id);
       recipeName=recipe.name;
       recipeImagePath=recipe.imagePath;
       recipeDescription=recipe.description;
       //since a recipe can be added without ingredients,we first need to check if the current selected recipe has ingredients and if so
       // we loops through all the ingredients and add its ingredients to the form array of controls
        if( recipe['ingredients'] ){
          for(let ingredient of recipe.ingredients){

            recipeIngredients.push(new FormGroup({
              'name':new FormControl(ingredient.name, Validators.required),
              'amount':new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])

            }));
          }
        }
    }
    this.recipeForm=new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath':new FormControl(recipeImagePath,Validators.required),
      'description':new FormControl(recipeDescription, Validators.required),
      'ingredients':recipeIngredients  // assigm recipeIngredients which is of type FormArray to ingredients. Now the form 'ingredients is type formArray which has form control name and amount  
    });
     
  }

 
  get controls(){ //getter
    return (<FormArray>this.recipeForm.get('ingredients')).controls;  //from the recipeForm we get the ingredients which is of type FormArray and return it. ingredients is a formArray of controls name and amount
  }

  onSubmit(){
  /* const newRecipe=new Recipe(this.recipeForm.value['name'],this.recipeForm.value['description'],
   this.recipeForm.value['imagePath'],this.recipeForm.value['ingredients']);
   */
   if(this.editMode)
   {
     //this.recipeService.updateRecipe(this.id, newRecipe);
     this.recipeService.updateRecipe(this.id, this.recipeForm.value);
   }else{
      // this.recipeService.updateRecipe(this.id, newRecipe);
     this.recipeService.addRecipe(this.recipeForm.value)
   }
   
   this.router.navigate(['../'],{relativeTo:this.route});  //just navigate a step back
  }

  onCancel(){
    // this.router.navigate(['recipes']);
    this.router.navigate(['../'],{relativeTo:this.route});  //just navigate a step back
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
 
  //from the recipeForm we get the FormArray 'ingredients'  ,and then we push new empty form controls to the form array
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
  

}
