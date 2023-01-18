import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { UsuarioService } from '../services/usuarios/usuario.service';

@Directive({
  selector: '[appVerificaEmail]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: VerificaEmailDirective, multi: true }]
})
export class VerificaEmailDirective implements AsyncValidator {

  constructor(
    private servicoUsuario: UsuarioService,
  ) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    // retorna método que conecta ao endpoint de verificação de e-mail e passa como argumento, o valor do campo
    // onde é chamado.
    return this.servicoUsuario.verificaEmail(c.value).pipe(
      // O endpoint retorna bad-request, caso o e-mail já exista.
      // Portanto, é feito o tratamento e caso o erro seja bad-request,
      // a diretiva não é satisfeita e invalida o campo onde é chamada.
      catchError(async (err) => err.status === 400 ? { 'appVerificaEmail': true } : EMPTY)
  )};
}
