import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PainelTurmasComponent } from './pages/painel-turmas/painel-turmas.component';
import { PainelUsuariosComponent } from './pages/painel-usuarios/painel-usuarios.component';
import { LoginComponent } from './pages/login/login.component';
import { PainelDisciplinasComponent } from './pages/painel-disciplinas/painel-disciplinas.component';
import { PainelItensDisciplinasComponent } from './pages/painel-itens-disciplinas/painel-itens-disciplinas.component';
import { ChecklistComponent } from './pages/checklist/checklist.component';


const routes: Routes = [
  { path: 'admin', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/turmas', component: PainelTurmasComponent },
  { path: 'admin/usuarios', component: PainelUsuariosComponent },
  { path: 'admin/disciplinas', component: PainelDisciplinasComponent },
  { path: 'admin/disciplinas/:disciplina', component: PainelItensDisciplinasComponent },
  { path: 'admin/itens-disciplinas', component: PainelItensDisciplinasComponent },
  { path: 'checklist', component: ChecklistComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
