import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { FeaturesAdminComponent } from '../components/admin/features-admin/features-admin.component';
import { FeaturesComponent } from '../components/features/features.component';
import { LoginComponent } from '../components/login/login.component';
import { Erro403 } from '../components/page-error/403.component';
import { CategoriasComponent } from '../components/admin/categorias/categorias.component';
import { ProdutosComponent } from '../components/admin/produtos/produtos.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { UsuariosComponent } from '../components/admin//usuarios/usuarios.component';
import { AutenticacaoGuard } from '../services/autenticacao/autenticacao.guard';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { DashboardsComponent } from '../components/admin//dashboards/dashboards.component';
import { DenunciasComponent } from '../components/admin/denuncias/denuncias.component';



const routes: Routes = [
  { path: 'features', component: FeaturesComponent},
  { path: 'user-profile', component: UserProfileComponent},
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent},
  { path: 'error-403', component: Erro403},
  { path: 'admin', canActivate: [AutenticacaoGuard], data: {papel: "ROLE_ADMIN"}, children: [
    {path: 'denuncias' , component: DenunciasComponent},
    { path: 'categorias', component: CategoriasComponent},
    { path: 'features-admin', component:FeaturesAdminComponent},
    { path: 'produtos', component: ProdutosComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'dashboards', component: DashboardsComponent },
  ]},
  { path: '', redirectTo: 'features', pathMatch:'full'},


]

@NgModule({

  declarations: [],

  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],

  exports: [RouterModule]

})

export class RoutesModule { }
