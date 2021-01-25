import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry , catchError} from 'rxjs/operators'
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  paramMap: any;

  constructor(private httpClient:HttpClient) { }

  //Get All products
  public getAllProducts():Observable<IProduct[]>{
    let dataURL = "http://127.0.0.1:5000/api/products";
    return this.httpClient.get<IProduct[]>(dataURL).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  //Get A Single Product
  public getProduct(productId:string):Observable<IProduct>{
    let dataURL = `http://127.0.0.1:5000/api/products/${productId}`;
    return this.httpClient.get<IProduct>(dataURL).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  //Create Product
  public createProduct(product:IProduct):Observable<IProduct>{
    let dataURL = `http://127.0.0.1:5000/api/products/`;
    return this.httpClient.post<IProduct>(dataURL,product).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  //update a Product
  public updateProduct(product:IProduct , productId:string):Observable<IProduct>{
    let dataURL = `http://127.0.0.1:5000/api/products/${productId}`;
    return this.httpClient.put<IProduct>(dataURL,product).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
   //Delete a Product
   public deleteProduct(productId:string):Observable<IProduct>{
    let dataURL = `http://127.0.0.1:5000/api/products/${productId}`;
    return this.httpClient.delete<IProduct>(dataURL).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  handleError(error:HttpErrorResponse){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
