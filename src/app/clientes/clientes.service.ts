import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './cliente';
//import {Headers } from '@angular/http';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class ClientesService {

  //private token = 'Bearer ' + JSON.parse(localStorage.getItem('token')).token;
  
  //private options = new HttpHeaders({ headers: this.httpHeader });
  
  private url: string = "http://localhost:8080/users";

  clientesChanged = new EventEmitter<Observable<Cliente[]>>();

  constructor(private http: HttpClient) { }

  getAll(): Observable<Cliente[]> {
  
    return this.http.get<Cliente[]>(this.url,{headers:this.getHeaders()})
            .map(res => res)
            .catch(this.handleError);         
  }

  private handleError(error: any) {
    let erro = error.messsage || 'Server error';
    console.error('Ocorreu um erro  ',error);
    return Observable.throw(erro);
  }

  add(cliente: Cliente) {
    return this.http.post(this.url,JSON.stringify(cliente),
    {headers: this.getHeaders()})
    .do(data => this.clientesChanged.emit(this.getAll()))
    .catch(this.handleError);
  }

  update(cliente: Cliente) {
    return this.http.put(this.url+'/'+cliente.id,JSON.stringify(cliente),
    {headers: this.getHeaders()})
    .do(data => this.clientesChanged.emit(this.getAll()))
    .catch(this.handleError);
  }

  remove(id: number) {
    return this.http.delete(this.getUrl(id),
           {headers: this.getHeaders()})
           //.map(res => res.json())
           .do(data => this.clientesChanged.emit(this.getAll()))
           .catch(this.handleError);
  }

  get(id: number) {
    return this.getAll()
           .map((list: any) => list.find(cliente => cliente.id == id))
           .catch(this.handleError);
  }

  private getHeaders() {
    //let headers = new Headers();
    //headers.append('Content-Type','application/json');
    //return headers;
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '
    + JSON.parse(localStorage.getItem('token'))});

    return headers;
  }

  private getUrl(id: number) {
    return `${this.url}/${id}`;
  }







}
