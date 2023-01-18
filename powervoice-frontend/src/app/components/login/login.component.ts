import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/users/user';
import { LoginService } from 'src/app/services/logins/login.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertaService } from 'src/app/services/alertas/alerta.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(
    private servicoLogin: LoginService,
    private servicoAlerta: AlertaService,
    config: NgbModalConfig, private modalService: NgbModal
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  usuario: User = <User>{};

  submit(form: NgForm): void {
    this.servicoLogin.login(this.usuario);
  }

  ngOnInit(): void {
  }

  open(content: any) {
    this.modalService.open(content);
  }

}


