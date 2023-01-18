import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { LoginService } from '../logins/login.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoGuard implements CanActivate {
  
  constructor(
    private servico: LoginService,
    private router: Router
    ) {}

  canActivate(route: ActivatedRouteSnapshot,): boolean {
    const autenticado = this.servico.verificaLogin();
    if (autenticado) {
      const papelUsuario = this.servico.getRole();
      const papelExigido = route.data['papel'];
      if (papelExigido && papelUsuario != papelExigido) {
        this.router.navigate(['/error-403']);
        return false;

      }
      return true;
    }
    return false;
  }
  
}