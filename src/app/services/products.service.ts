// import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { retry, catchError, map} from 'rxjs/operators';
import { throwError, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // private apiUrl:string = `${environment.API_URL}/api/products`;
  private apiUrl:string = `https://22young-sands-07814.herokuapp.com/api`;


  constructor(private http: HttpClient) { }

  getAllProducts(limit?: number, offset?:number){
    let params  = new HttpParams();
    if(limit && offset){
      params = params.set('limit',limit);
      params = params.set('offset',offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`,{params}).pipe(
      retry(3)
    );
  }

  getByCategory(categoryId:string,limit?: number, offset?:number){
    let params  = new HttpParams();
    if(limit && offset){
      params = params.set('limit',limit);
      params = params.set('offset',offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`,{params})
  }

  fetchReadAndUpdate(id:string, dto:UpdateProductDTO){
    ///Correr paralelo la data de dos observables
    return zip(
      this.getProduct(id),
      this.update(id,dto)
    )
  }

  getProduct(id: string){
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if( error.status === 500){
          return throwError(() =>'Algo esta fallando en el server')
        }
        if( error.status === HttpStatusCode.NotFound){
          return throwError(()=>'El producto no existe')
        }
        if( error.status === HttpStatusCode.Unauthorized){
          return throwError(()=>'No estas autorizado')
        }
        return throwError(()=>'Ups algo salio mal')
      })
    )
  }

  getproductsByPage(limit: number, offset:number){
    return this.http.get<Product[]>(`${this.apiUrl}/products`,{
      params:{limit,offset}
    }).pipe(retry(3),
    map(products => products.map(item => {
      return{
        ...item,
        taxes: .19 * item.price
      }
    }))
    );
  }

  create(dto:CreateProductDTO){
    return this.http.post<Product>(`${this.apiUrl}/products`,dto);
  }

  update(id:string, dto:UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`,dto);
  }

  delete(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }

}
