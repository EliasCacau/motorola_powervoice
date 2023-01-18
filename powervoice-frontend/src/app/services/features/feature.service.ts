import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { FeatureUpdate } from 'src/app/models/features/feature-update.model';
import { Feature } from 'src/app/models/features/feature.model';
import { Category } from 'src/app/models/categorys/category';
import { Product } from 'src/app/models/products/product';
import { environment } from 'src/environments/environment';
import { Pageable } from 'src/app/models/pageables/pageable';

@Injectable({
  providedIn: 'root'
})

export class FeatureService {

  constructor(
    private http: HttpClient
    ) { }

    // Requesitando a API
   apiUrl: string = environment.apiUrl + '/feature';


   get(page?: number): Observable<Pageable<Feature>> {
     let url = this.apiUrl;

    if (page) {
      url += '/get/all/?page=' + page;
    }
    else{
      url += '/get/all'
    }
    return this.http.get<Pageable<Feature>>(url)
  }

  busca(termoBusca?: string, page?: number): Observable<Pageable<Feature>> {
    let url = this.apiUrl;
    if (termoBusca && page)
    url += '/get/by-term/'+termoBusca + '?page=' + page;
    else
    url += '/get/by-term/'+termoBusca;

    return this.http.get<Pageable<Feature>>(url)
  }

  getById(id: number): Observable<Feature> {
    return this.http.get<Feature>(this.apiUrl+'/get/'+id);
  }

  insert(objeto: Feature): Observable<Feature> {
    return this.http.post<Feature>(this.apiUrl+'/create', objeto);
  }
  update(id: number, objeto: FeatureUpdate): Observable<Feature> {
    return this.http.put<Feature>(this.apiUrl+'/edit/'+id, objeto);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl+'/delete/'+id);
  }

  getUserFeature():Observable<Feature[]> {
    return this.http.get<Feature[]>(this.apiUrl+'/user/').pipe();
  }


  filterProductAndCategory(category: Category, product: Product): Observable<Feature[]> {
      let params = new HttpParams();
      if('id' in category) {
        params = params.append('categoryId', category.id);
      }
      if('id' in product) {
        params = params.append('productId', product.id);
      }
      return this.http.get<Feature[]>(this.apiUrl+'/filter/', { params: params });
    }

    rankingTop10(): Observable<Feature[]> {
    return this.http.get<Feature[]>(this.apiUrl + '/get/top10/')
    }
    }
