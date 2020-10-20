import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";

const routes: Routes=[

     // path:'' ,since this module will be loaded through lazy loading 
    {path:'', component:AuthComponent}
];

@NgModule({
 imports:[RouterModule.forChild(routes)],
 exports:[RouterModule]
})
export class AuthRoutingModule {

}