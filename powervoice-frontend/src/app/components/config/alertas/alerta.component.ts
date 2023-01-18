import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { Alerta } from 'src/app/models/alertas/alerta';
import { ETipoAlerta } from 'src/app/models/alertas/e-tipo-alerta';
import { AlertaService } from 'src/app/services/alertas/alerta.service';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent implements OnInit {

  constructor(
    public servicoAlerta: AlertaService,
    private router: Router,
  ) {}

  tipoAlerta: Alerta = <Alerta>{};
   
  // Função responsável por manipular o DOM quando dispara alertas
  exibeAlerta(alerta: Alerta) {
    // atribui tipo de alerta a uma variável externa
    // Captura as divs que serão manipuladas
    const elementoAlerta = document.querySelector<HTMLElement>('div.alert');
    const elementoAlertaMensagem = document.querySelector<HTMLElement>('div.alert span#mensagem');
    if (elementoAlerta && elementoAlertaMensagem) {
      // injeta a mensagem do erro no elemento capturado (span#mensagem)
      elementoAlertaMensagem.innerText = alerta.mensagem;
      // injeta o tipo como classe ao elemento capturado (div.alert)
      elementoAlerta.classList.add(alerta.tipo)
      }
    // A exibição do alerta dura 5 segundos
    setTimeout(() => {
      this.fechaAlerta();
    }, 3000);
    
  }

  // Função responsável por manipular o DOM, com ação de ocultar o alerta.
  fechaAlerta(): void {
    // Captura a div que será manipulada
    const elementoAlerta = document.querySelector<HTMLElement>('div.alert');
    if (elementoAlerta) {
      // Remove a mensagem e o tipo do erro (injetado como classe) da div capturada
      elementoAlerta.classList.remove(ETipoAlerta.ERRO, ETipoAlerta.SUCESSO, ETipoAlerta.AVISO, ETipoAlerta.INFO);
    }

  }
  
  ngOnInit(): void {
    // Recebe o alerta do service e atribui os valores (tipo/mensagem) ao parâmetro "alerta"
    this.servicoAlerta.receberAlerta().subscribe(alerta => {
      this.tipoAlerta = alerta;
       this.exibeAlerta(this.tipoAlerta);
    });

    this.router.events.subscribe((evento) => {
      if (evento instanceof NavigationStart) {
        this.fechaAlerta();
      }
    })
  }

}
