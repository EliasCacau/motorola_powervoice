import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feature } from 'src/app/models/features/feature.model';
import { User } from 'src/app/models/users/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  //  // Requesitando a API
  //  apiUrl: string = environment.apiUrl + '/user/';

  //  get(termoBusca?: string): Observable<User[]> {
  //   let url = this.apiUrl;
  //   if (termoBusca) {
  //     url +=  + termoBusca;

  //   }
  //   return this.http.get<User[]>(url)
  // }

  // getById(id: number): Observable<User> {
  //   return this.http.get<User>(this.apiUrl+id);
  // }

  // insert(objeto: User): Observable<User> {
  //   return this.http.post<User>(this.apiUrl, objeto);
  // }
 
  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(this.apiUrl+id);
  // }
}


