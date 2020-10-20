export class User{
    constructor(public email:string , public id:string,private _token:string, private _tokenExpirationDate: Date){}

get token(){
    //if the _tokenExpirationDate does not exist or if the current time and date stamp is greater than the tokenExpirationDate, then the token expired
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
        return null;
    }
    return this._token;
}
}