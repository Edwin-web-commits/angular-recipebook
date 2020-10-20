import {NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ShoppingListComponent } from './shopping-list.component';

const routes:Routes=[
       // path:'' ,since this module will be loaded through lazy loading 
       {path: '', component:ShoppingListComponent},
]

@NgModule({
 imports:[RouterModule.forChild(routes)],
 exports:[RouterModule]
})
export class ShoppingListRoutingModule {

}