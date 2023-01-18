import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/categorys/category';
import { City } from 'src/app/models/citys/city';
import { Country } from 'src/app/models/contrys/country';
import { Feature } from 'src/app/models/features/feature.model';
import { Product } from 'src/app/models/products/product';
import { State } from 'src/app/models/states/state';
import { User } from 'src/app/models/users/user';
import { AlertaService } from 'src/app/services/alertas/alerta.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { CityService } from 'src/app/services/citys/city.service';
import { CountryService } from 'src/app/services/countrys/country.service';
import { FeatureService } from 'src/app/services/features/feature.service';
import { LoaderService } from 'src/app/services/loaders/loader.service';
import { LoginService } from 'src/app/services/logins/login.service';
import { ProductService } from 'src/app/services/products/product.service';
import { StateService } from 'src/app/services/states/state.service';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(
    private servicoCategory: CategoryService,
    private servicoProduct: ProductService,
    private servicoUser: UsuarioService,
    public servicoLoader: LoaderService,
    private servicoAlerta: AlertaService,
    private servico: LoginService , 
    private stateService: StateService,
    private countryService: CountryService,
    private cityService: CityService,
    private modalService: NgbModal,
    private servicoFeature: FeatureService
    
  ) { }


  // Grande parte das funções foram reaproveitadas de usuario, e para evitar criar novos servicos estou usando o serviço do mesmo.

  registroUpdateFeature :Feature = <Feature>{} ;
  registroFeature: Feature = <Feature>{};
  registrosFeature: Feature[] = Array<Feature>();
  registros: User[] = Array<User>();
  registroRecovered: User = <User>{};
  categoryId: Category[] = Array<Category>();
  productId: Product[] = Array<Product>();
  registroUpdate: User = <User>{};
  city: City[] = Array<City>();
  state: State[] = Array<State>();
  country: Country[] = Array<Country>();
  compareById = Utils.compareById;

  getUsuarioAutenticado(): User {
    return this.servico.getUsuario();
  }

  isAutenticado(): boolean {
    return this.servico.isAutenticado();
  }

  get(): void {
    this.servicoUser.get().subscribe({
      next: (resposta: User[]) => {
        this.registros = resposta;
      },
    });
  }

  getFeature(id: number): void {
    this.servicoFeature.getById(+id).subscribe({
      next: (resposta: Feature) => {
        this.registroFeature = resposta;
      },
    });
  }


  getFeatureUser():void {
    this.servicoFeature.getUserFeature().subscribe({
      next:(resposta: Feature[]) => {
        this.registrosFeature = resposta ;
      },
    });
  }
  //Abrir o modal das features do usuário

  openXl(content: any)  {
    this.modalService.open(content, { size: 'xl' });
  }
 
  selecionaDadosUpdateFeature() {
    this.registroUpdateFeature.title = this.registroFeature.title;
    this.registroUpdateFeature.description = this.registroFeature.description;
    this.registroUpdateFeature.categoryId = this.registroFeature.category.id;
    this.registroUpdateFeature.productId = this.registroFeature.product.id;

    return this.registroUpdateFeature;
  }


  // Função que captura os dados necessários para atender o padrão Json de update do usuário na API.

  selecionaDadosUpdateUser() {

    
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

  submitUpdateFeature(submitUpdateFeature: NgForm): void {

    if (this.registroFeature.id) {
      this.servicoFeature.update(this.registroFeature.id, this.selecionaDadosUpdateFeature()).subscribe({
        complete: () => {
         submitUpdateFeature.resetForm();
          this.getFeatureUser();
        this.servicoAlerta.enviarAlertaSucesso('Alterado com sucesso!');

        },
      });
    } 

  }


  submit(formUser: NgForm): void {
    
    // Tratamento para data, evitando retroceder ao efetuar o submit.
    let data = new Date(this.selecionaDadosUpdateUser().birthDate);
    data = new Date(data.getTime() + data.getTimezoneOffset() * 60 * 1000);
    let registroModificado = Object.assign({}, this.selecionaDadosUpdateUser());
    registroModificado.birthDate = data.toISOString();

    // efetua o update das informações
    this.servicoUser.update(registroModificado).subscribe({
      complete: () => {
        this.servicoAlerta.enviarAlertaSucesso('Usuário alterado com sucesso!');
        this.get();
      },
    });
  }

  // recupera as informações do usuario após disparar o evento no form
  getUser(): void {
    let id = this.getUsuarioAutenticado().id;
    this.servicoUser.getById(+id).subscribe({
      next: (resposta: User) => {
        this.registroRecovered = resposta;
        this.setState();
        this.setCity();
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
  // do endpoint todas as Cidades vinculadas àquele id .
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

  // recupera todas as regiões que estão no BD
  getCountry(): void {
    this.countryService.get().subscribe({
      next: (resposta: Country[]) => {
        this.country = resposta.sort((a, b) => a.name.localeCompare(b.name));
      },
    });
  }


  // Quando o evento é disparado e confirmado, ele envia o id para a rota do endpoint responsável por deletar.
  delete(id: number, name: string): void {
    if (confirm(`Deseja realmente excluir a feature: ${name}?`)) {
      this.servicoFeature.delete(id).subscribe({
        complete: () => {
          this.getFeatureUser();
        },
      });
    }
  }

  
  
  ngOnInit(): void {
  
    this.getFeatureUser();

    this.getUser();

    this.registroRecovered = this.getUsuarioAutenticado();

    this.get();

    this.servicoCategory.get().subscribe({
      next: (resposta: Category[]) => {
        this.categoryId = resposta.sort((a, b) =>
          a.category.localeCompare(b.category)
        );
      },
    });

    // Renderiza as categorias no formulário
    this.servicoProduct.get().subscribe({
      next: (resposta: Product[]) => {
        this.productId = resposta.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      },
    });


    this.getCountry();
    }
  }

   
