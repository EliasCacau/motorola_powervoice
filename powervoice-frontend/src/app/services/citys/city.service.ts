import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { City } from 'src/app/models/citys/city';
import { State } from 'src/app/models/states/state';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(
    
    private http: HttpClient
    ) { }


    // Requesitando a API
   apiUrl: string = environment.apiUrl + '/location';
   
   
   get(termoBusca?: string): Observable<City[]> {
    let url = this.apiUrl;
    if (termoBusca) { url += termoBusca; }
    else {url += + '/get/cities'}
    return this.http.get<City[]>(url)
  }

  getById(id: number): Observable<City> {
    return this.http.get<City>(this.apiUrl+'/get/cities/'+id);
  }

  cityByState(id: number): Observable<City> {
    return this.http.get<City>(this.apiUrl+'/citiesbystate/'+id);
  }

  insert(objeto: City): Observable<City> {
    return this.http.post<City>(this.apiUrl, objeto);
  }
  update(objeto: City): Observable<City> {
    return this.http.put<City>(this.apiUrl + 'editar', objeto);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl+id);
  }
}
