import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PainelTurmasComponent } from './pages/painel-turmas/painel-turmas.component';
import { PainelUsuariosComponent } from './pages/painel-usuarios/painel-usuarios.component';
import { LoginComponent } from './pages/login/login.component';
import { PainelDisciplinasComponent } from './pages/painel-disciplinas/painel-disciplinas.component';
import { PainelItensDisciplinasComponent } from './pages/painel-itens-disciplinas/painel-itens-disciplinas.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'turmas', component: PainelTurmasComponent },
  { path: 'usuarios', component: PainelUsuariosComponent },
  { path: 'disciplinas', component: PainelDisciplinasComponent },
  { path: 'itens-disciplinas', component: PainelItensDisciplinasComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
