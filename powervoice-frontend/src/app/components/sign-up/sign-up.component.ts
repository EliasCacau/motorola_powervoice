import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/citys/city';
import { Country } from 'src/app/models/contrys/country';
import { State } from 'src/app/models/states/state';
import { User } from 'src/app/models/users/user';
import { AlertaService } from 'src/app/services/alertas/alerta.service';
import { CityService } from 'src/app/services/citys/city.service';
import { CountryService } from 'src/app/services/countrys/country.service';
import { StateService } from 'src/app/services/states/state.service';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { Utils } from 'src/app/utils/utils';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private servicoUsuario: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private stateService: StateService,
    private countryService: CountryService,
    private cityService: CityService,
    private servicoAlerta: AlertaService,

  ) { }

  registro: User = <User>{};
  cities: City = <City>{};
  city: City[] = Array<City>();
  state: State[] = Array<State>();
  country: Country[] = Array<Country>();
  compareById = Utils.compareById;

  form = {
    password: '',
    confirmPassword: '',
    email: '',
  };


  submit(signUpForm: NgForm): void {
    // Se o formulário for inválido, não faz o submit.
    if (signUpForm.invalid) {
      return;
    } else {

      this.registro.password = this.form.confirmPassword;
      this.registro.email = this.form.email;
      // Tratamento para data, evitando retroceder ao efetuar o submit.
      let data = new Date(this.registro.birthDate);
      data = new Date(data.getTime() + data.getTimezoneOffset() * 60 * 1000);
      let registroModificado = Object.assign({}, this.registro);
      registroModificado.birthDate = data.toISOString();

      this.servicoUsuario.insert(registroModificado).subscribe({
        complete: () => {
          this.servicoAlerta.enviarAlertaSucesso('Usuário cadastrado com sucesso!');
          signUpForm.resetForm();

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        }
      })
    }
  }

  // recupera todas as regiões que estão no BD
  getCountry(): void {
    this.countryService.get().subscribe({
      next: (resposta: Country[]) => {
        this.country = resposta.sort((a, b) => a.name.localeCompare(b.name));
      }
    })
  };

  // Condiciona passar o id da região. Após disparar o evento no form (selecionar a região), ele recupera
  // do endpoint todos os Estados vinculados àquele id.
  setState(): void {
    let id = this.registro.country.id
    if (id) {
      this.stateService.stateByCountry(id).subscribe({
        next: (resposta: any) => {
          this.state = resposta.filter((data: { id: Country; }) => data.id)
        }
      })
    }
  }

  // Condiciona passar o id do Estado. Após disparar o evento no form (selecionar Estado), ele recupera
  // do endpoint todas as Cidades vinculadas àquele id.
  setCity(): void {
    let id = this.registro.state.id
    if (id) {
      this.cityService.cityByState(id).subscribe({
        next: (resposta: any) => {
          this.city = resposta.filter((data: { id: State; }) => data.id)
        }
      })
    }
  }



  ngOnInit(): void {
    this.getCountry()
  }

}
