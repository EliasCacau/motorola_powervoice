import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/categorys/category';
import { Feature } from 'src/app/models/features/feature.model';
import { Product } from 'src/app/models/products/product';
import { Reaction } from 'src/app/models/reactions/reaction';
import { EReportStatus } from 'src/app/models/reports/e-report-status'
import { ReportCategory } from 'src/app/models/report-category/report-category';
import { Report } from 'src/app/models/reports/report';
import { User } from 'src/app/models/users/user';
import { AlertaService } from 'src/app/services/alertas/alerta.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { FeatureService } from 'src/app/services/features/feature.service';
import { LoginService } from 'src/app/services/logins/login.service';
import { ProductService } from 'src/app/services/products/product.service';
import { ReactionService } from 'src/app/services/reactions/reaction.service';
import { ReportsService } from 'src/app/services/reports/reports.service';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-features-cards',
  templateUrl: './features-cards.component.html',
  styleUrls: ['./features-cards.component.scss']
})

export class FeaturesCardsComponent implements OnInit {

  constructor(
    private servicoUser: UsuarioService,
    private servicoCategory: CategoryService,
    private servicoProduct: ProductService,
    private servicoAlerta: AlertaService,
    private modalService: NgbModal,
    private servicoLogin: LoginService,
    private serviceReport: ReportsService,
    private servicoReaction: ReactionService,
    private servicoFeature: FeatureService,
  ) { }

  // Recebe os valores do componente pai (features)
  @Input() registroCard: Feature = <Feature>{};
  @Input() productsFeatures: Product[] = Array<Product>();
  @Input() categorysReports: ReportCategory[] = Array<ReportCategory>();


  @Output() atualizaRegistros = new EventEmitter();

  categoryId: Category[] = Array<Category>();
  productId: Product[] = Array<Product>();
  categorysFeatures: Category[] = Array<Category>();
  reportId: ReportCategory[] = Array<ReportCategory>();
  registroReport: Report = <Report>{};
  registrosReport: Report[] = Array<Report>();
  registroUpdateFeature: Feature = <Feature>{};
  registroFeature: Feature = <Feature>{};
  registrosFeature: Feature[] = Array<Feature>();
  registroUser: User = <User>{};
  registroReaction: Reaction = <Reaction>{};
  isLiked: boolean = false;
  compareById = Utils.compareById;

  // Seção de likes

  addLike(id: number): void {
    // recupera o id da feature do card e o id do usuário logado. Em seguida,
    this.registroReaction.featureId = id;
    this.registroReaction.userId = this.getUsuarioAutenticado().id;
    // Submete o like para o servidor. 
    // Obs. Inremento/Decremento de likes utiliza essa mesma função
    this.servicoReaction.insert(this.registroReaction).subscribe({
      complete: () => {
        // recupera o registro atualizado do servidor
        this.servicoFeature.getById(this.registroCard.id).subscribe((data) => {
          this.registroCard = data;
        });

        // Retorna o evento para o componente pai, que chama
        // o método get e atualiza a contagem de likes
        this.atualizaRegistros.emit();
        this.isLiked = this.isLiked ? false : true;
      }
    });
  }

  verificaLiked() {
    // Condiciona a verificação apenas para usuários logados no sistema.
    if (this.isAutenticado()) {

      // Solução para "bug" de comunicação entre componentes. Quando features-cards inicia, espera alguns
      // milésimos antes de verificar e comparar likes.
      // Caso não haja essa espera, features-cards recupera um valor vazio do sessionStorage, devido ao
      // evento no componente features não ter sido concluído a tempo.
      setTimeout(() => {
        // Recupera a lista de features salva no sessionStorage (features que o usuário deu like)
        const recuperaLiked: Feature[] = JSON.parse(sessionStorage.getItem('registroLikes') || '{}');
        // Verifica se o id da feature existe na lista recuperada;
        // Caso exista, retorna true.
        this.isLiked = recuperaLiked.some((feature) => feature.id === this.registroCard.id);
      }, 130);

    }
  }

  // Realiza o tratamento de dados no formato json de update de features que a api requer.
  selecionaDadosUpdateFeature() {
    this.registroUpdateFeature.title = this.registroFeature.title;
    this.registroUpdateFeature.description = this.registroFeature.description;
    this.registroUpdateFeature.categoryId = this.registroFeature.category.id;
    this.registroUpdateFeature.productId = this.registroFeature.product.id;

    return this.registroUpdateFeature;
  }

  // Função que captura os dados necessários para atender o padrão Json de update do usuário na API
  // Não passa atributos como "enabled", "authorities" etc.
  selecionaDadosUser() {
    this.registroUser.id = this.getUsuarioAutenticado().id,
      this.registroUser.name = this.getUsuarioAutenticado().name,
      this.registroUser.username = this.getUsuarioAutenticado().username,
      this.registroUser.password = this.getUsuarioAutenticado().password,
      this.registroUser.email = this.getUsuarioAutenticado().email,
      this.registroUser.phone = this.getUsuarioAutenticado().phone,
      this.registroUser.sex = this.getUsuarioAutenticado().sex,
      this.registroUser.birthDate = this.getUsuarioAutenticado().birthDate,
      this.registroUser.country = this.getUsuarioAutenticado().country,
      this.registroUser.state = this.getUsuarioAutenticado().state,
      this.registroUser.city = this.getUsuarioAutenticado().city,
      this.registroUser.role = this.getUsuarioAutenticado().role

    return this.registroUser;
  }

  // Condiciona passar o id do produto. Após disparar o evento no form (selecionar o produto), ele recupera
  // do endpoint todas as categorias vinculadas àquele id.
  setCategory(): void {
    let id = this.registroFeature.product.id;
    if (id) {
      this.servicoProduct.categoryByProduct(id).subscribe({
        next: (resposta: any) => {
          this.categorysFeatures = resposta.productCategory;
        }
      })
    }
  }


  // Realiza o submit de denúncias
  submitReport(form: NgForm): void {
    // Se o formulário for inválido, não faz o submit;
    if (!form.valid) {
      return;
    }
    // Status inicial de "UnderEvaluation" para denúncias
    this.registroReport.reportStatus = EReportStatus.UnderEvaluation;
    // Resgata data
    this.registroReport.reportDate =  new Date;
    // Recupera a feature e inclui no objeto que será submetido
    this.registroReport.feature = this.registroFeature;
    // tratamento da informação do usuário autor da publicação (formato json que a api requer)
    this.registroReport.feature.user = this.selecionaDadosUser();
    // tratamento do usuário autor da denúncia (formato json que a api requer)
    this.registroReport.user = this.selecionaDadosUser();
    this.serviceReport.insert(this.registroReport).subscribe({
      complete: () => {
        form.resetForm();
        this.servicoAlerta.enviarAlertaInfo('Nosso time irá analisar essa publicação. Agradecemos sua colaboração!')
      },
    });

  }



  // Vai realizar o update das features
  submitUpdateFeature(submitUpdateFeature: NgForm): void {
    if (submitUpdateFeature.invalid) {
      return;
    }
    this.servicoFeature.update(this.registroFeature.id, this.selecionaDadosUpdateFeature()).subscribe({
      complete: () => {
        submitUpdateFeature.resetForm();
        //  Atualiza a informação do card
        this.servicoFeature.getById(this.registroCard.id).subscribe((data) => {
          this.registroCard = data;
        });
        // Exibe alerta
        this.servicoAlerta.enviarAlertaSucesso('Alterado com sucesso!');

      },
    });
  }

  // Verifica autenticação
  isAutenticado(): boolean {
    return this.servicoLogin.isAutenticado();
  }

  // recupera Usuario
  getUsuarioAutenticado(): User {
    return this.servicoLogin.getUsuario();
  }


  // Dispara com o evento click no html
  getFeature(id: number): void {
    // Quando clica para editar uma feature, essa função recebe o id da feature e recupera
    // os dados dela no endpoint
    this.servicoFeature.getById(+id).subscribe({
      next: (resposta: Feature) => {
        // Em seguida atribui os dados recebidos a variável this.registroFeature
        this.registroFeature = resposta;
      },
      complete: () => {
        // Quando completa a requisição, chama a função setCategory para setar o
        // a categoria correspondente.
        // Obs. Necessário devido ao preenchimento em cascata (Produto -> Categoria) que está implementado.
        this.setCategory();
      }
    });
  }

  // Seção dos modais
  openLike(content: any) {
    this.modalService.open(content, { size: 'md', centered: true, keyboard: true, backdrop: true });
  }
  // Modal de edição as features
  openUpdate(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  // Modal de report da feature
  openReport(content: any) {
    this.modalService.open(content, { size: 'md', centered: true, keyboard: true, backdrop: true });
  }

  ngOnInit(): void {
    // Sempre que o componente for chamado, faz a verificação
    // de likes do usuário;
    this.verificaLiked();


  }

}
