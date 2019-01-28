import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private _http:HttpClient) { }
  lastProduct(){
    console.log('treid to get last');
    return this._http.get('/api/products/last');
  }
  indexProducts(){
    return this._http.get('/api/products/index');
  }
  showProduct(id){
    return this._http.get('/api/products/'+id);
  }
  createProduct(edits){
    console.log("SERVICE create function run");
    return this._http.post('/api/products/new',edits);
  }
  editProduct(id,edits){
    console.log("SERVICE edit function run");
    return this._http.put('/api/products/'+id,edits);
  }
  deleteProduct(id){
    return this._http.delete('/api/products/'+id);
  }

}
