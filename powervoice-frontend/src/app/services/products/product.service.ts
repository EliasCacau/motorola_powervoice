import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pageable } from 'src/app/models/pageables/pageable';
import { Product } from 'src/app/models/products/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    
    private http: HttpClient
    ) { }


    // Requesitando a API
   apiUrl: string = environment.apiUrl + '/product';
   
   
   get(): Observable<Product[]> {
    let url = this.apiUrl;
      url += '/get/all'
    return this.http.get<Product[]>(url)
  }
  
  getPageable (page?: number) {
    let url = this.apiUrl;

    if (page) {
      url += '/get/all/pageable' + '?page=' + page;
    }
    else{
      url += '/get/all/pageable'
    }
    return this.http.get<Pageable<Product>>(url)
  }

  busca(termoBusca?: string, page?: number): Observable<Pageable<Product>> {
    let url = this.apiUrl;
    if (termoBusca && page)
    url += '/get/by-term/'+termoBusca + '?page=' + page;
    else
    url += '/get/by-term/'+termoBusca;

    return this.http.get<Pageable<Product>>(url)
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(this.apiUrl+'/get/id/'+id);
  }

  insert(objeto: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl+'/create', objeto);
  }
  update(objeto: Product): Observable<Product> {
    return this.http.put<Product>(this.apiUrl + '/edit', objeto);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl+'/delete/'+id);
  }

  categoryByProduct(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl+'/get/id/'+id);
  }
}