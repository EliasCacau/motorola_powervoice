import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/categorys/category';
import { LoaderService } from 'src/app/services/loaders/loader.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { AlertaService } from 'src/app/services/alertas/alerta.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  constructor(
    private servicoCategory: CategoryService,
    public servicoLoader: LoaderService,
    private modalService: NgbModal,
    private servicoAlerta: AlertaService,
    config: NgbModalConfig,

  ) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

   registros: Category[] = Array<Category>();
   categoriaRecovered: Category = <Category>{};
   termoBusca: string = "";

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
     this.servicoCategory.getPageable(page).subscribe((data) => {
       this.registros = data.content;
       this.collectionSize = data.totalElements;
     });
   }
 
   buscaRegistros(termoBusca?: string, page?: number): void {
     termoBusca = this.termoBusca;
     page = this.page -1;
     if (termoBusca) {
       this.servicoCategory.busca(termoBusca, page).subscribe((data) => {
         this.registros = data.content;
         this.collectionSize = data.totalElements;
 
       });
     }
     else {
       this.registros = [];
       this.getPageable();
     }
   }


   submit(form: NgForm): void {

    // efetua o update das informações
    if (this.categoriaRecovered.id) {
      this.servicoCategory.update(this.categoriaRecovered).subscribe({
        complete: () => {
          this.servicoAlerta.enviarAlertaSucesso('Alterado com sucesso!');
          form.resetForm();
          this.getPageable();
        }
      });
    } else {
      this.servicoCategory.insert(this.categoriaRecovered).subscribe({
        complete: () => {
          this.servicoAlerta.enviarAlertaSucesso('Adicionado com sucesso!');
          form.resetForm();
          this.getPageable();
        }
      });
    }    
  }

    // recupera as informações do usuario após disparar o evento no form
    getCategory(id: number): void {
      this.servicoCategory.getById(+id).subscribe({
        next: (resposta: Category) => {
          this.categoriaRecovered = resposta;
        }
      });
  }

    // abre o modal para editar a Categoria
    open(content: any) {
      this.modalService.open(content, { size: 'xs', centered: true});
    }

  // Quando o evento é disparado e confirmado, ele envia o id para a rota do endpoint responsável por deletar.
  delete(id: number, name: string): void {
    if (confirm(`Deseja realmente excluir a categoria: ${name}?`)) {
      this.servicoCategory.delete(id).subscribe({
        complete: () => {
          this.getPageable();
          this.servicoAlerta.enviarAlertaSucesso('Categoria deletada!')
        }
      })
    }
  }

  ngOnInit(): void {
    this.getPageable();
  }

}