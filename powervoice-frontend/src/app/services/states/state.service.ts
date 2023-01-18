import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { State } from 'src/app/models/states/state';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(
    
    private http: HttpClient
    ) { }


    // Requesitando a API
   apiUrl: string = environment.apiUrl + '/location';
   
   
   get(termoBusca?: string): Observable<State[]> {
    let url = this.apiUrl;
    if (termoBusca) {
      url += termoBusca;
    } else {
      url += '/states'
    }
    return this.http.get<State[]>(url)
  }

  getById(id: number): Observable<State> {
    return this.http.get<State>(this.apiUrl+id);
  }

  stateByCountry(id: number): Observable<State> {
  return this.http.get<State>(this.apiUrl+'/country/'+id);
  }

  insert(objeto: State): Observable<State> {
    return this.http.post<State>(this.apiUrl, objeto);
  }
  update(objeto: State): Observable<State> {
    return this.http.put<State>(this.apiUrl + 'editar', objeto);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl+id);
  }
}