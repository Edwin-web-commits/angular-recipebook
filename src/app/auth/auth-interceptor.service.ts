 import { HttpClient, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
 import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
 import { AuthService } from './auth-service';

 @Injectable()
 export class AuthInterceptorService implements HttpInterceptor {
   
    constructor(private authService:AuthService, private http: HttpClient){}

   intercept(req:HttpRequest<any> , next: HttpHandler){

       //take(1) will tell angular to take one value from the user observable ,give us the latest user and thereafter unsubscribe automatically
       //exhaustMap wait for the first observable(user observable) to complete,which will happen after we taken the latest user and then it give us that user

       return this.authService.user.pipe(take(1),exhaustMap(user=>{

           if(!user){
               return next.handle(req);
           }
           const modifiedReq=req.clone({ params: new HttpParams().set('auth',user.token)
           });

           return next.handle(modifiedReq);
         })
         );


 }
}