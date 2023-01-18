import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { City } from 'src/app/models/citys/city';
import { Country } from 'src/app/models/contrys/country';
import { State } from 'src/app/models/states/state';
import { User } from 'src/app/models/users/user';
import { AlertaService } from 'src/app/services/alertas/alerta.service';
import { CityService } from 'src/app/services/citys/city.service';
import { CountryService } from 'src/app/services/countrys/country.service';
import { LoaderService } from 'src/app/services/loaders/loader.service';
import { StateService } from 'src/app/services/states/state.service';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  constructor(
    public servicoLoader: LoaderService,
    private servicoAlerta: AlertaService,
    private servicoUser: UsuarioService,
    private modalService: NgbModal,
    private stateService: StateService,
    private countryService: CountryService,
    private cityService: CityService,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  registros: User[] = Array<User>();
  registroRecovered: User = <User>{};
  registroUpdate: User = <User>{};
  city: City[] = Array<City>();
  state: State[] = Array<State>();
  country: Country[] = Array<Country>();
  termoBusca: string = "";
  compareById = Utils.compareById;

  // Elementos da paginação
  page = 1 ;
  pageSize = 20;
  collectionSize = 0;

  refreshPages(): void {
    if (this.termoBusca) {
      this.buscaRegistros(this.termoBusca)
    }
    else {
      this.getPageable(this.page -1);
    }
  }

  getPageable(page?: number): void {
    this.servicoUser.getPageable(page).subscribe((data) => {
      this.registros = data.content;
      this.collectionSize = data.totalElements;
    });
  }

  buscaRegistros(termoBusca?: string, page?: number): void {
    termoBusca = this.termoBusca;
    page = this.page -1;
    if (termoBusca) {
      this.servicoUser.busca(termoBusca, page).subscribe((data) => {
        this.registros = data.content;
        this.collectionSize = data.totalElements;

      });
    }
    else {
      this.registros = [];
      this.getPageable();
    }
  }

  // Função que captura os dados necessários para atender o padrão Json de update do usuário na API.
  selecionaDadosUpdate() {
    this.registroUpdate.id = this.registroRecovered.id,
    this.registroUpdate.name = this.registroRecovered.name, 
    this.registroUpdate.username = this.registroRecovered.username,
    this.registroUpdate.password = this.registroRecovered.password,
    this.registroUpdate.email = this.registroRecovered.email,
    this.registroUpdate.phone = this.registroRecovered.phone,
    this.registroUpdate.sex = this.registroRecovered.sex,
    this.registroUpdate.birthDate = this.registroRecovered.birthDate,
    this.registroUpdate.country = this.registroRecovered.country,
    this.registroUpdate.state = this.registroRecovered.state,
    this.registroUpdate.city = this.registroRecovered.city,
    this.registroUpdate.role = this.registroRecovered.role

    return this.registroUpdate;
  }
  
  
  submit(form: NgForm): void {
    // Tratamento para data, evitando retroceder ao efetuar o submit.
    let data = new Date(this.selecionaDadosUpdate().birthDate);
    data = new Date(data.getTime() + data.getTimezoneOffset() * 60 * 1000);
    let registroModificado = Object.assign({}, this.selecionaDadosUpdate());
    registroModificado.birthDate = data.toISOString();

    // efetua o update das informações
    this.servicoUser.update(registroModificado).subscribe({
      complete: () => {
        form.resetForm();
        this.servicoAlerta.enviarAlertaSucesso('Alterado com sucesso!');
        this.getPageable();
      },
    });
  }

  // abre o modal
  open(content: any) {
    this.modalService.open(content, { size: 'md', scrollable: true });
  }

  // recupera as informações do usuario após disparar o evento no form
  getUser(id: number): void {
    this.servicoUser.getById(+id).subscribe({
      next: (resposta: User) => {
        this.registroRecovered = resposta;
        this.setState();
        this.setCity();
      },
    });
  }

  // recupera todas as regiões que estão no BD
  getCountry(): void {
    this.countryService.get().subscribe({
      next: (resposta: Country[]) => {
        this.country = resposta.sort((a, b) => a.name.localeCompare(b.name));
      },
    });
  }

  // Condiciona passar o id da região. Após disparar o evento no form (selecionar a região), ele recupera
  // do endpoint todos os Estados vinculados àquele id.
  setState(): void {
    let id = this.registroRecovered.country.id;
    if (id) {
      this.stateService.stateByCountry(id).subscribe({
        next: (resposta: any) => {
          this.state = resposta.filter((data: { id: Country }) => data.id);
        },
      });
    }
  }

  // Condiciona passar o id do Estado. Após disparar o evento no form (selecionar Estado), ele recupera
  // do endpoint todas as Cidades vinculadas àquele id.
  setCity(): void {
    let id = this.registroRecovered.state.id;
    if (id) {
      this.cityService.cityByState(id).subscribe({
        next: (resposta: any) => {
          this.city = resposta.filter((data: { id: State }) => data.id);
        },
      });
    }
  }

  // Quando o evento é disparado e confirmado, ele envia o id para a rota do endpoint responsável por deletar.
  delete(id: number, name: string): void {
    if (confirm(`Deseja realmente excluir o usuário: ${name}?`)) {
      this.servicoUser.delete(id).subscribe({
        complete: () => {
          this.getPageable();
          this.servicoAlerta.enviarAlertaInfo('Usuário deletado!')

        },
      });
    }
  }

  ngOnInit(): void {
    this.getPageable();
    this.getCountry();
  }
}
