import{ Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth-service';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
})
export class HeaderComponent implements OnInit,OnDestroy{
    collapsed=true;

    private subscription:Subscription;
    isAuthenticated=false;

    constructor(private dataStorageService: DataStorageService,private authService:AuthService){}

    ngOnInit(){
      this.subscription=this.authService.user.subscribe(user=>{
       this.isAuthenticated= !user? false: true; //if there is no user then it means we are not authenticated,else if we have user then we are authenticated  
      })
    }
    onSaveData(){
        this.dataStorageService.storeRecipes();
    }
    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }
    ngOnDestroy(){
     this.subscription.unsubscribe();
    }

}