import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import {map,take} from "rxjs/operators";
import { AuthService } from "./auth-service";


@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService, private myrouter:Router){}
 // if the user is not authenticated (if we do not have a user), he must be automatically directed to route (or urlTree) auth component and must not access recipes component
    canActivate(route: ActivatedRouteSnapshot,router:RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.authService.user.pipe(take(1),map(user=>{
          const isAuth= !!user ; //!user? false: true
          if(isAuth){
              return true;
          }
          return this.myrouter.createUrlTree(['/auth']); //directing to auth component through auth route
        }));
    }
}