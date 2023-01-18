import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alerta } from 'src/app/models/alertas/alerta';
import { ETipoAlerta } from 'src/app/models/alertas/e-tipo-alerta';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor() {
    this.controleAlerta = new Subject<Alerta>();
  }

  private controleAlerta: Subject<Alerta>;

  // recebe os erros capturados pelo interceptor
  enviarAlerta(alerta: Alerta): void {
    this.controleAlerta.next(alerta);
  }

  enviarAlertaErro(mensagemAlerta: string): void {
    this.controleAlerta.next({
      tipo: ETipoAlerta.ERRO,
      mensagem: mensagemAlerta
    })
  }

  enviarAlertaSucesso(mensagemAlerta: string): void {
    this.controleAlerta.next({
      tipo: ETipoAlerta.SUCESSO,
      mensagem: mensagemAlerta
    })
  }

  enviarAlertaAviso(mensagemAlerta: string): void {
    this.controleAlerta.next({
      tipo: ETipoAlerta.AVISO,
      mensagem: mensagemAlerta
    })
  }

  enviarAlertaInfo(mensagemAlerta: string): void {
    this.controleAlerta.next({
      tipo: ETipoAlerta.INFO,
      mensagem: mensagemAlerta
    })
  }

  receberAlerta(): Observable<Alerta> {
    return this.controleAlerta.asObservable();
  }
}
