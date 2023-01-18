import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportCategory } from 'src/app/models/report-category/report-category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportCategoryService {

  constructor(
    private http: HttpClient
  ) { }

  // Requesitando a API
  apiUrl: string = environment.apiUrl + '/reportCategory/';

  get(termoBusca?: string): Observable<ReportCategory[]> {
    let url = this.apiUrl + "get/all";
    if (termoBusca) {
      url +=  + termoBusca;
 
    }

    return this.http.get<ReportCategory[]>(url)
  }

  getById(id: number): Observable<ReportCategory> {

    return this.http.get<ReportCategory>(this.apiUrl+'/get/id'+id);

  }

  insert(objeto: ReportCategory): Observable<ReportCategory> {
    return this.http.post<ReportCategory>(this.apiUrl+'/create', objeto);
  }
  // update(id: number, objeto: ReportCategoryUpdate): Observable<ReportCategory> {
  //   return this.http.put<ReportCategory>(this.apiUrl+'/edit/'+id, objeto);
  // }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl+'/delete/'+id);
  }
}
function tap(log: { (...data: any[]): void; (message?: any, ...optionalParams: any[]): void; }): import("rxjs").OperatorFunction<ReportCategory[], ReportCategory[]> {
  throw new Error('Function not implemented.');
}

