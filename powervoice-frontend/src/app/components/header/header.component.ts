import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbDropdownConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/users/user';
import { LoginService } from 'src/app/services/logins/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [NgbDropdownConfig],  // add NgbDropdownConfig to the component providers
  encapsulation: ViewEncapsulation.None,
})

export class HeaderComponent implements OnInit {

  constructor(
    private offcanvasService: NgbOffcanvas,
    private servico: LoginService,

  ) { }

  openCustomPanelClass(content: TemplateRef<any>) {
    this.offcanvasService.open(content);
  }


  logout(): void {
    this.servico.logout();
  }

  getUsuarioAutenticado(): User {
    return this.servico.getUsuario();
  }

  isAutenticado(): boolean {
    return this.servico.isAutenticado();
  }


  ngOnInit(): void {

  }

}
