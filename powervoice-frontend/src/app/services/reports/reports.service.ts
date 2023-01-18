import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Report } from 'src/app/models/reports/report';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  getPageable(page: number | undefined) {
    throw new Error('Method not implemented.');
  }
  busca(termoBusca: string, page: number) {
    throw new Error('Method not implemented.');
  }

  constructor( 
    private http: HttpClient
    ) { }

    
    // Requesitando a API
    apiUrl: string = environment.apiUrl + '/report/';

    get(termoBusca?: string): Observable<Report[]> {
      let url = this.apiUrl + "get/all";
      if (termoBusca) {
        url +=  + termoBusca;
   
      }
      return this.http.get<Report[]>(url)
    }

    getById(id: number): Observable<Report> {

      return this.http.get<Report>(this.apiUrl+'get/id'+id);

    }

    insert(objeto: Report): Observable<Report> {
      return this.http.post<Report>(this.apiUrl+'create', objeto);
    }

    update(objeto: Report): Observable<Report> {
      return this.http.put<Report>(this.apiUrl+'edit/', objeto);
    }
    
    delete(id: number): Observable<void> {
      return this.http.delete<void>(this.apiUrl+'delete/'+id);
    }

    

}
