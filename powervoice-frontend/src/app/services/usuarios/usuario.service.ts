import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/models/pageables/pageable';
import { User } from 'src/app/models/users/user';
import { environment } from 'src/environments/environment';
import { ICrudService } from '../i-crud-service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements ICrudService<User> {

  apiUrl: string = environment.apiUrl + '/usuario';

  constructor(
    private http: HttpClient
    ) {}

    get(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl+'/get/all');
    }

    getPageable (page?: number) {
      let url = this.apiUrl;
  
      if (page) {
        url += '/get/all/pageable' + '?page=' + page;
      }
      else{
        url += '/get/all/pageable'
      }
      return this.http.get<Pageable<User>>(url)
    }

    busca(termoBusca?: string, page?: number): Observable<Pageable<User>> {
      let url = this.apiUrl;
      if (termoBusca && page)
      url += '/get/by-term/'+termoBusca + '?page=' + page;
      else
      url += '/get/by-term/'+termoBusca;
  
      return this.http.get<Pageable<User>>(url)
    }

  getById(id: number): Observable<User> {
    return this.http.get<User>(this.apiUrl+'/get/'+id);
  }

  insert(objeto: User): Observable<User> {
    return this.http.post<User>(this.apiUrl+'/cadastro', objeto);
  }
  update(objeto: User): Observable<User> {
    return this.http.put<User>(this.apiUrl+'/edit', objeto);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl+'/delete/'+id);
  }

  verificaUsuario(username: string) {
    return this.http.get<any>(this.apiUrl+'/check-username/'+ username);
  }

  verificaEmail(email: string) {
    return this.http.get<any>(this.apiUrl+'/check-email/'+ email);
  }

}
