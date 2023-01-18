import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, catchError, EMPTY } from 'rxjs';
import { UsuarioService } from '../services/usuarios/usuario.service';

@Directive({
  selector: '[appVerificaUsuario]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: VerificaUsuarioDirective, multi: true }]
})
export class VerificaUsuarioDirective implements AsyncValidator {

  constructor(
    private servicoUsuario: UsuarioService,
  ) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    // retorna método que conecta ao endpoint de verificação de usuário e passa como argumento, o valor do campo
    // onde é chamado.
    return this.servicoUsuario.verificaUsuario(c.value).pipe(
      // O endpoint retorna bad-request, caso o usuário já exista.
      // Logo, é feito o tratamento e se o status for bad-request,
      // a diretiva não é satisfeita e invalida o campo onde é chamada.
      catchError(async (err) => err.status === 400 ? { 'appVerificaUsuario' : true } : EMPTY)
  )};
  
}
