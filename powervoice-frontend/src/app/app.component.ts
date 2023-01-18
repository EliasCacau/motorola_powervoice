import { Component } from '@angular/core';
import { LoginService } from './services/logins/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'powervoice-frontend';

  constructor(private servico: LoginService) {
    this.servico.verificaLogin();
  }
  
}
