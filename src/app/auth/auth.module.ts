import {NgModule } from '@angular/core';
import {AuthRoutingModule} from './auth-routing.module';

import {AuthComponent} from './auth.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations:[ AuthComponent],
  imports:[FormsModule  , CommonModule, AuthRoutingModule,SharedModule],
 
  
})
export class AuthModule {

}