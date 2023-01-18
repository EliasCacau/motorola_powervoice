import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from 'src/app/models/contrys/country';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(
    
    private http: HttpClient
    ) { }


    // Requesitando a API
   apiUrl: string = environment.apiUrl + '/location';
   
   
   get(termoBusca?: string): Observable<Country[]> {
    let url = this.apiUrl;
    if (termoBusca) { url += termoBusca;} 
    else { url += '/get/countries'; }
    return this.http.get<Country[]>(url)
  }

  getById(id: number): Observable<Country> {
    return this.http.get<Country>(this.apiUrl+'/get/countries/'+id);
  }

  insert(objeto: Country): Observable<Country> {
    return this.http.post<Country>(this.apiUrl, objeto);
  }
  update(objeto: Country): Observable<Country> {
    return this.http.put<Country>(this.apiUrl + '/edit', objeto);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl+'/delete/'+id);
  }
}
