import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

let headers = new HttpHeaders({
  'Content-Type': 'application/json'
});
let options = {
  headers: headers
}

@Injectable()
export class LoginServiceService {

  private link_servico: string = 'http://localhost:8080/auth';
  //private token = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token;
  //private headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.token });
  //private headers = new Headers({ 'Content-Type': 'application/json'});
  //private options = new HttpHeaders({ headers: this.headers });

  public showNavBarEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();    

  private authenticated = false;

  constructor(private router: Router,private http: HttpClient) { }

  //agora vai
  signIn(user: User){
    /*if ((user.email === 'user@email.com') && (user.password === '123456')){
        this.authenticated = true;
        this.showNavBar(true);
        this.router.navigate(['/']);

    }else{
      this.authenticated = false;
      
    }*/

    /*this.http.post(this.link_servico+'/login', JSON.stringify(user), options)
    .subscribe(data => {
         console.log(data);
    });*/
    this.http.post(this.link_servico + '/login', JSON.stringify(user), options).pipe(tap(
      data => this.session(data),
      error => this.authenticated = false)).subscribe();
    
    //return this.http.post(this.link_servico + '/login',JSON.stringify(user) ,this.options);
    
                    
  }

  logout(){
    this.authenticated = false;
    this.showNavBar(false);
    this.router.navigate(['/signin']);
  }

  isAuthenticated(){
    return this.authenticated; 
  }
  private showNavBar(ifShow: boolean){
    this.showNavBarEmitter.emit(ifShow);
  }
  session(data) {
    //sessionStorage.setItem('token', JSON.stringify(body.token));
    
    localStorage.setItem('token', JSON.stringify(data.token));
    this.authenticated=true;
    this.showNavBar(true);
    this.router.navigate(['/']);
  }
  
 /* private extractData(res: Response) {
    let body = res.json();
    localStorage.setItem('currentUser',body.token);
    return body.data || { };
  }*/
  
  /*private handleError (error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }*/

}
