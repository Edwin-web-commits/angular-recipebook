import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user.model'; 

import { BehaviorSubject, Subject, throwError} from 'rxjs'; //this will create a new observable that wraps an error
import { Router } from '@angular/router';

import{environment} from '../../environments/environment';    //for production and deployment

export interface AuthResponseData{
    kind:string;
    idToken:string;
    email:string;
    refreshToken: string;
    expiresIn: string;
    localId:string;
    registered?: boolean; // ? to indicate that this is obtional because the sign up request will not yield or return it but the login request will
}

@Injectable({
    providedIn:'root'
})
export class AuthService {

    tokenExpirationTimer: any;

  //  user = new Subject<User>();
    user= new BehaviorSubject<User>(null); //BehaviorSubject works just like the normal Subject,the difference is that
    //...BehaviorSubject also gives subcribers immidiate access to the previously emitted value even if they have not subscribed at the 
    //...point of time that value was emitted.This means we can get access to the currently active user even if we only subscribe after that user has been emitted,
    //...this means when we fetch data and we need that token at this point of time even if the user logged in before that point of time "which will have been the case"
    //...we get access to that latest user.Therefore BehaviorSubject needs be initialised with the starting value which has no be a user object but in our case null is a valid
    //replacement because we do not want to start off with a user.

    constructor(private http: HttpClient, private router:Router){}

    signup(useremail: string, userpassword: string){

         // return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBM1dId7-mxNM1lkh7asWC-ZxB0MQBikbk'
    return  this.http.post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseAPIKey,
          { email:useremail , 
            password: userpassword , 
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap((resData)=>{
           this.handleAuthentication(resData.email, resData.localId,resData.idToken,+resData.expiresIn);
        }));
    
          
    }

    autoLogin()
    {
        const userData:{
            email:string,
            id: string,
            _token:string,
            _tokenExpirationDate:string
        } =JSON.parse(localStorage.getItem('userData')); //getting user data from the web local storage in JSON string format and convert it to a JAvascript object format
        if(!userData){
           return;
        }
        const loadedUser =new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate),
            );

            if(loadedUser.token){
                this.user.next(loadedUser);
                 const expirationDuration=  new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()  //future time in mil seconds minus the current time in mil second.Thats the time we have until the token expires
                this.autoLogout(expirationDuration);
            }
        
    }


    login(email:string, password:string){
        
        // return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBM1dId7-mxNM1lkh7asWC-ZxB0MQBikbk'
      return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseAPIKey,
      {  email:email,
         password:password ,
         returnSecureToken: true 
      }).pipe(catchError(this.handleError), tap((resData)=>{
        this.handleAuthentication(resData.email, resData.localId,resData.idToken, +resData.expiresIn);
     }));

    }
  
    //creating user and handling authentication
   private handleAuthentication(email:string, userId:string, token:string, expiresIn:number){

    const expirationDate=new Date(new Date().getTime()+ expiresIn*1000 ); 
    const user=new User(email,userId, token,expirationDate)
    this.user.next(user);
    this.autoLogout(expiresIn * 1000); 
    localStorage.setItem('userData',JSON.stringify(user)); //saves user data to the local storage in the web
   }

   //this method will handle error responses from the server requests
    private handleError(errorRes: HttpErrorResponse){

        let errorMessage='An unknown error occured' //incase we cant identify the error

        //if the errorRes does not have the error key or if the errorRes does not have nested error.
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        //if the errorRes has error.error.message format,check the message
     switch(errorRes.error.error.message){
         case 'EMAIL_EXISTS':
             errorMessage='This email already exists';
             break;
         case 'EMAIL_NOT_FOUND':
          errorMessage='Email not found'
             break;
         case 'INVALID_PASSWORD':
          errorMessage='Invalid password';
             break;
         case 'USER_DISABLED':
             errorMessage='The user account has been disabled by an administrator.';
             break;
             
     }
     return throwError(errorMessage); 
    }

    logout()
    {
        this.user.next(null); 
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData'); //clear the data of the current user when logging out

        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer=null;
        }
    }
    //will auto logout after expirationDuration time
    autoLogout(expirationDuration:number){
     this.tokenExpirationTimer=setTimeout(()=>{
         this.logout();
     },expirationDuration)
    }
}