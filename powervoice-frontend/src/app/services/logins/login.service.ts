import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../../models/users/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private usuario: User = <User>{};
  private autenticado = false;

  isAutenticado(): boolean {
    return this.autenticado;
  }

  getUsuario(): User {
    return this.usuario;
  }

  getRole(): string {
    return this.usuario.role;
  }

  verificaLogin(): boolean {
    if (!this.isAutenticado()) {
      this.usuario = JSON.parse(sessionStorage.getItem('user') || '{}');
      if (Object.keys(this.usuario).length > 0) {
        this.autenticado = true;
      }
    }
    return this.isAutenticado();
  }

  login(usuario: User): void {
    this.usuario = usuario;
    const credenciaisCodificadas = btoa(usuario.username + ':' + usuario.password);
    
    const opcoesHttp = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + credenciaisCodificadas
      })
    }
    let url = environment.apiUrl + '/login/';
    this.http.get<User>(url, opcoesHttp).subscribe({
      next: (usuario: User) => {
        if (usuario) {
          this.autenticado = true;
          this.usuario = usuario;
          sessionStorage.setItem('user', JSON.stringify(usuario));
          this.router.navigate(['/']);
        }
      }
    })
  }

  logout(): void {
    let url = environment.apiUrl + '/logout';
    this.http.get(url).subscribe({
      complete: () => {
        this.autenticado = false;
        this.usuario = <User>{};
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('registroLikes');
        this.router.navigate(['/login']);
      }
    })
  }
}
