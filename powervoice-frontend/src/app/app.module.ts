import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbAccordionConfig, NgbModal, NgbModalConfig, NgbModule, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


// Importações de components
import { AppComponent } from './app.component';
import { FeaturesAdminComponent } from './components/admin/features-admin/features-admin.component';
import { FeaturesComponent } from './components/features/features.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { Erro403 } from './components/page-error/403.component';
import { CategoriasComponent } from './components/admin/categorias/categorias.component';
import { ProdutosComponent } from './components/admin/produtos/produtos.component';
import { SidebarAdminComponent } from './components/admin/sidebar-admin/sidebar-admin.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UsuariosComponent } from './components/admin/usuarios/usuarios.component';
import { LoadingComponent } from './components/config/loading/loading.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FeaturesCardsComponent } from './components/features-cards/features-cards.component';
import { AlertaComponent } from './components/config/alertas/alerta.component';

// Importações de Interceptors
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { RequisicaoInterceptor } from './interceptors/requisicao.interceptor';

// Importação do módulo de rotas
import { RoutesModule } from './routes/routes.module';

// Importação de diretivas
import { MatchPasswordDirective } from './directives/password-pattern.directive';
import { VerificaEmailDirective } from './directives/verifica-email.directive';
import { VerificaUsuarioDirective } from './directives/verifica-usuario.directive';

// Importação do servico window para manipulação de eventos window em components
import { WINDOW_PROVIDERS } from './services/window/window.service';
import { RankingTop10Component } from './components/ranking-top10/ranking-top10.component';
import { DashboardsComponent } from './components/admin/dashboards/dashboards.component';
import { DenunciasComponent } from './components/admin/denuncias/denuncias.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FeaturesComponent,
    LoginComponent,
    SignUpComponent,
    ProdutosComponent,
    UsuariosComponent,
    SidebarAdminComponent,
    CategoriasComponent,
    FeaturesAdminComponent,
    Erro403,
    LoadingComponent,
    UserProfileComponent,
    FeaturesCardsComponent,
    AlertaComponent,
    MatchPasswordDirective,
    VerificaEmailDirective,
    VerificaUsuarioDirective,
    RankingTop10Component,
    DashboardsComponent,
    DenunciasComponent,

  ],
  imports: [
    BrowserModule,
    RoutesModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    InfiniteScrollModule,
    NgxMaskModule.forRoot(),

  ],
  providers: [
    NgbModalConfig, 
    NgbModal, 
    NgbAccordionConfig,
    NgbProgressbarConfig,
    WINDOW_PROVIDERS,
    { provide: HTTP_INTERCEPTORS, useClass: RequisicaoInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
