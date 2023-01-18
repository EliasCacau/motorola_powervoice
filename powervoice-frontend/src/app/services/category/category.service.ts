import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from 'src/app/models/categorys/category';
import { Pageable } from 'src/app/models/pageables/pageable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(
    
    private http: HttpClient
    ) { }


    // Requesitando a API
   apiUrl: string = environment.apiUrl + '/category';
   
   
   get(): Observable<Category[]> {
    let url = this.apiUrl;
      url += '/get/all';
    return this.http.get<Category[]>(url)
  }

  getPageable (page?: number) {
    let url = this.apiUrl;

    if (page) {
      url += '/get/all/pageable'+'?page='+ page;
    }
    else{
      url += '/get/all/pageable'
    }
    return this.http.get<Pageable<Category>>(url)
  }

  busca(termoBusca?: string, page?: number): Observable<Pageable<Category>> {
    let url = this.apiUrl;
    if (termoBusca && page)
    url += '/get/by-term/'+termoBusca +'?page='+ page;
    else
    url += '/get/by-term/'+termoBusca;

    return this.http.get<Pageable<Category>>(url)
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(this.apiUrl+'/get/id/'+id);
  }

  insert(objeto: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl+'/create', objeto);
  }
  update(objeto: Category): Observable<Category> {
    return this.http.put<Category>(this.apiUrl + '/edit', objeto);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl+'/delete/'+id);
  }
}