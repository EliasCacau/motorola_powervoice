import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom } from 'rxjs';
import { Category } from 'src/app/models/categorys/category';
import { Product } from 'src/app/models/products/product';
import { AlertaService } from 'src/app/services/alertas/alerta.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoaderService } from 'src/app/services/loaders/loader.service';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {


  constructor(
    public servicoLoader: LoaderService,
    private servicoProduct: ProductService,
    private servicoCategory: CategoryService,
    private modalService: NgbModal,
    private servicoAlerta: AlertaService,
    private fb: FormBuilder,
    config: NgbModalConfig,

  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  registros: Product[] = Array<Product>();
  categoryAll: Category[] = Array<Category>();
  productCategory: Category[] = Array<Category>();
  termoBusca: string = "";
  registro: number[] = Array<number>();

  // Elementos da paginação
  page = 1;
  pageSize = 20;
  collectionSize = 0;

  novoForm!: FormGroup;

  // Formulário reativo. Declara os atributos do objeto do formulário
  getForm() {
    this.novoForm = this.fb.group({
      id: this.fb.control(null),
      name: this.fb.control('', [Validators.required]),
      productCategory: this.fb.array([
      ], [Validators.required])
    }
    );
  }


  refreshPages(): void {
    if (this.termoBusca) {
      this.buscaRegistros(this.termoBusca)
    }
    else {
      this.getPageable(this.page - 1);
    }
  }

  getPageable(page?: number): void {
    this.servicoProduct.getPageable(page).subscribe((data) => {
      this.registros = data.content;
      this.collectionSize = data.totalElements;
    });
  }

  buscaRegistros(termoBusca?: string, page?: number): void {
    termoBusca = this.termoBusca;
    page = this.page - 1;
    if (termoBusca) {
      this.servicoProduct.busca(termoBusca, page).subscribe((data) => {
        this.registros = data.content;
        this.collectionSize = data.totalElements;

      });
    }
    else {
      this.registros = [];
      this.getPageable();
    }
  }



  // Submete as informações para o servidor;
  submit(): void {
    // Se o formulário for inválido, não faz o submit.
    if (!this.novoForm.valid)
      return

    // Se o formulário já contiver um id e ele for diferente de nulo, faz o update.
    if (this.novoForm.controls['id'].value != null) {
      this.servicoProduct.update(this.novoForm.value).subscribe({
        complete: () => {
          this.getPageable();
          this.servicoAlerta.enviarAlertaSucesso('Alterado com sucesso!');
        }
      });
    } else {
      // Se o formulário ainda não tiver um id, faz o cadastro.
      this.servicoProduct.insert(this.novoForm.value).subscribe({
        complete: () => {
          this.getPageable();
          this.servicoAlerta.enviarAlertaSucesso('Adicionado com sucesso!');
        }
      });
    }
  }


  // recupera as informações do usuario após disparar o evento no form
  getProduto(id: number): void {
    this.servicoProduct.getById(+id).subscribe({
      next: (resposta: Product) => {
        // recupera a lista de categorias salvas;
        this.productCategory = resposta.productCategory;

        // Preenche o formulário as informações recuperadas
        this.novoForm = this.fb.group({
          id: this.fb.control(resposta.id),
          name: this.fb.control(resposta.name, [Validators.required]),
          productCategory: this.fb.array(resposta.productCategory
            , [Validators.required])
        }
        );
      }
    });
  }

  // Chamado pelo ngIf do input do checkbox e recebe o id da categoria.
  verificaProductCategory(id: number): boolean {
    let isChecked: boolean = false;
    // Verifica se o id da categoria existe na lista de categorias recuperadas
    this.productCategory.forEach((item) => {
      if (item.id === id) {
        // Se for igual, muda o status da variável isChecked para true
        isChecked = true;
      }
    })
    // retorna o valor de isChecked
    return isChecked;
  }


  // Verifica se o checkbox está marcado ou desmarcado
  onChange(categorys: Category, isChecked: boolean) {

    // Constante que permite enviar valores para a lista "productCategory" no formulário;
    const categorysFormArray = <FormArray>this.novoForm.controls['productCategory'];

    // Se o estado do input mudar para true, ele adiciona no formulário a categoria do checkbox 
    if (isChecked) {
      categorysFormArray.push(new FormControl(categorys));
    } else {
      // Se o checkbox for desmarcado (false), ele percorre o array em busca do valor que corresponda
      // a categoria do checkbox. Se houver, ele armazena o valor do index na variável;
      let index = categorysFormArray.controls.findIndex(x => x.value == categorys)
      // remove do index (se a variável houver valor)
      categorysFormArray.removeAt(index);
    }
  }

  // abre o modal para editar Produto
  open(content: any) {
    this.modalService.open(content, { size: 'xs', centered: true });
  }

  // Quando o evento é disparado e confirmado, ele envia o id para a rota do endpoint responsável por deletar.
  delete(id: number, name: string): void {
    if (confirm(`Deseja realmente excluir o produto: ${name}?`)) {
      this.servicoProduct.delete(id).subscribe({
        complete: () => {
          this.getPageable();
          this.servicoAlerta.enviarAlertaSucesso('Produto deletado!')
        }
      })
    }
  }

  ngOnInit(): void {
    this.getPageable();

    // Recupera a lista de categorias.
    this.servicoCategory.get().subscribe((data) => {
      this.categoryAll = data;
    });
  }


}
