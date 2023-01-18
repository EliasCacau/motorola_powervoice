import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FeatureUpdate } from 'src/app/models/features/feature-update.model';
import { Feature } from 'src/app/models/features/feature.model';
import { Category } from 'src/app/models/categorys/category';
import { Product } from 'src/app/models/products/product';
import { User } from 'src/app/models/users/user';
import { FeatureService } from 'src/app/services/features/feature.service';
import { LoaderService } from 'src/app/services/loaders/loader.service';
import { LoginService } from 'src/app/services/logins/login.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/products/product.service';
import { Utils } from 'src/app/utils/utils';
import { AlertaService } from 'src/app/services/alertas/alerta.service';

@Component({
  selector: 'app-features-admin',
  templateUrl: './features-admin.component.html',
  styleUrls: ['./features-admin.component.scss'],
})
export class FeaturesAdminComponent implements OnInit {
  constructor(
    public servicoLoader: LoaderService,
    private servicoFeature: FeatureService,
    private servicoCategory: CategoryService,
    private servicoProduct: ProductService,
    private servicoLogin: LoginService,
    private modalService: NgbModal,
    private servicoAlerta: AlertaService,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  registros: Feature[] = Array<Feature>();
  registro: Feature = <Feature>{};
  registroRecovered: Feature = <Feature>{};
  registroUpdate: FeatureUpdate = <FeatureUpdate>{};
  categoryId: Category[] = Array<Category>();
  termoBusca: string = "";
  productId: Product[] = Array<Product>();
  userId: User[] = Array<User>();
  user: User = <User>{};
  // Elementos da paginação
  page = 1 ;
	pageSize = 20;
	collectionSize = 0;
  compareById = Utils.compareById;

  // modal
  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }


  refreshPages(): void {
    if (this.termoBusca) {
      this.buscaRegistros(this.termoBusca)
    }
    else {
      this.get(this.page -1);
    }
  }

  get(page?: number): void {
    this.servicoFeature.get(page).subscribe((data) => {
      this.registros = data.content;
      this.collectionSize = data.totalElements;
    });
  }

  buscaRegistros(termoBusca?: string, page?: number): void {
    termoBusca = this.termoBusca;
    page = this.page -1;
    if (termoBusca) {
      this.servicoFeature.busca(termoBusca, page).subscribe((data) => {
        this.registros = data.content;
        this.collectionSize = data.totalElements;

      })
    }
    else {
      this.registros = [];
      this.get();
    }
  }

  // recupera as informações do usuario após disparar o evento no form
  getFeature(id: number): void {
    this.servicoFeature.getById(+id).subscribe({
      next: (resposta: Feature) => {
        this.registroRecovered = resposta;
      },
    });
  }


  // Função que captura os dados necessários para atender o padrão Json de update de Feature na API.
  selecionaDadosUpdate() {
    this.registroUpdate.title = this.registroRecovered.title;
    this.registroUpdate.description = this.registroRecovered.description;
    this.registroUpdate.categoryId = this.registroRecovered.category.id;
    this.registroUpdate.productId = this.registroRecovered.product.id;

    return this.registroUpdate;
  }

  // Submit do formulário de cadastro de features
  submit(form: NgForm): void {
    // efetua o update das informações
    if (this.registroRecovered.id) {
      this.servicoFeature.update(this.registroRecovered.id, this.selecionaDadosUpdate()).subscribe({
        complete: () => {
          form.resetForm();
          this.get();
        this.servicoAlerta.enviarAlertaSucesso('Alterado com sucesso!');

        },
      });
    } 
    else {
      this.registro.userId = this.getUsuarioAutenticado().id;
      this.servicoFeature.insert(this.registro).subscribe({
        complete: () => {
          this.servicoAlerta.enviarAlertaSucesso('Adicionado com sucesso!');
          form.resetForm();
          this.get();
        },
      });
    }
  }

  // Quando o evento é disparado e confirmado, ele envia o id para a rota do endpoint responsável por deletar.
  delete(id: number, title: string): void {
    if (confirm(`Deseja realmente excluir a feature: ${title}?`)) {
      this.servicoFeature.delete(id).subscribe({
        complete: () => {
          this.get();
          this.servicoAlerta.enviarAlertaAviso('A Feature foi deletada!')
        },
      });
    }
  }

  getUsuarioAutenticado(): User {
    return this.servicoLogin.getUsuario();
  }
  ;
  isAutenticado(): boolean {
    return this.servicoLogin.isAutenticado();
  }

  ngOnInit(): void {
    
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
  }
}
