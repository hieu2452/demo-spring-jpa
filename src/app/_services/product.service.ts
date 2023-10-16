import { Injectable } from '@angular/core';
import { Result } from '../_models/result';
import { Product } from '../_models/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserParams } from '../_models/userParam';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:8080/api/';
  result: Result<Product> | undefined;

  constructor(private http: HttpClient) { }

  getProducts(userParam: UserParams) {
    let params = this.getPaginationHeader(userParam.pageNumber, userParam.pageSize);
    params = params.append("category", userParam.category)
    params = params.append("order", userParam.orderBy)
    return this.http.get<Result<Product>>(this.baseUrl + 'products', { observe: 'response', params }).pipe(
      map(response => {
        return response.body;
      })
    )
  }

  getPaginationHeader(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('pageNo', pageNumber);
    params = params.append('pageSize', pageSize);
    return params;
  }
}
