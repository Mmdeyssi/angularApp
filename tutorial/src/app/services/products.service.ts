import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { PaginationParams , Products } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private  apiService : ApiService) { }
  getProducts = (url:string,params:PaginationParams): Observable<Products> => {
    return this.apiService.get(url,{
      params,
      
    });
  }
  addProducts=(url :string , body:any):Observable<any> => {
    return this.apiService.post(url,body,{})

  }
  editProducts=(url :string , body:any):Observable<any> => {
    return this.apiService.put(url,body,{})

  }
  deleteProducts=(url :string ):Observable<any> => {
    return this.apiService.delete(url,{})

  }
  

}
