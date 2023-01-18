import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alerta } from '../models/alertas/alerta';
import { ETipoAlerta } from '../models/alertas/e-tipo-alerta';
import { AlertaService } from '../services/alertas/alerta.service';
import { LoaderService } from '../services/loaders/loader.service';
import { LoginService } from '../services/logins/login.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

    private readonly ERRO_HTTP: { [key: number]: string } = {
    401: 'Usuário ou senha incorreta!',
    403: 'Acesso recusado. Verifique suas credenciais e tente novamente!',
    404: 'Ops! Não encontramos em nossos servidores esse recurso.',
    500: 'Erro interno do servidor.',
    503: 'Nossos servidores estão passando por manutenção.'
  }

  constructor(
    private servicoLoader: LoaderService,
    private servicoLogin: LoginService,
    private servicoAlerta: AlertaService,
    ) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.servicoLoader.isLoading.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.requests.push(req);

    // console.log("No of requests--->" + this.requests.length);

    this.servicoLoader.isLoading.next(true);
    return Observable.create((observer: { next: (arg0: HttpResponse<any>) => void; error: (arg0: any) => void; complete: () => void; }) => {
      
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          // Captura de erros. Emite alerta com a mensagem de erro especificada em ERRO_HTTP
          err => {
            let mensagemErro = this.ERRO_HTTP[err.status] || err.error?.message || err.statusText;
            // Se o erro for 401 (Não autorizado), força o logout do usuário no sistema;
            if(err.status === 401) {
              if (this.servicoLogin.isAutenticado()) {
                this.servicoLogin.logout();
              }
            }

            let alerta: Alerta = {
              tipo: ETipoAlerta.ERRO,
              mensagem: mensagemErro
            }

            // solução temporária: Verificação de e-mail dispara erro 400 no back-end
            if (err.status != 400) {
              this.servicoAlerta.enviarAlerta(alerta);
            }

            this.removeRequest(req);
            observer.error(err);
          },
          // No caso de erro, cancela as requisições da fila
          () => {
            this.removeRequest(req);
            observer.complete();
          });
      
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
