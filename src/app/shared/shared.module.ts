import { NgModule } from '@angular/core';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import { DropdowndirectiveDirective } from './dropdowndirective.directive';
import { CommonModule } from '@angular/common';

@NgModule({
 declarations:[ DropdowndirectiveDirective,
    LoadingSpinnerComponent,
    AlertComponent],

    imports:[CommonModule],

    exports:[
        DropdowndirectiveDirective,
        LoadingSpinnerComponent,
        AlertComponent,
        CommonModule
    ]

})
export class SharedModule {

}