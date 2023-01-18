import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, single, tap } from 'rxjs';
import { Feature } from 'src/app/models/features/feature.model';
import { Reaction } from 'src/app/models/reactions/reaction';
import { environment } from 'src/environments/environment';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  constructor(
    private http: HttpClient,
  ) { }

  apiUrl: string = environment.apiUrl + '/reaction/';
   
   
  get(termoBusca?: string): Observable<Reaction[]> {
   let url = this.apiUrl + "get/all";
   if (termoBusca) {
     url +=  + termoBusca;

   }
   return this.http.get<Reaction[]>(url)
 }

 getById(id: number): Observable<Reaction> {
   return this.http.get<Reaction>(this.apiUrl+id);
 }

 getByLikes(id: number): Observable<number>{
  return this.http.get<number>(this.apiUrl+'get/likeamount/'+id);
 }

 insert(objeto: Reaction): Observable<Reaction> {
   return this.http.post<Reaction>(this.apiUrl +'create', objeto);
 }

 getListUserLikes(id: number): Observable<Reaction[]> {
  return this.http.get<Reaction[]>(this.apiUrl+'list/'+id);
 }
}
