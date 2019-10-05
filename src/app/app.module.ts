import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PainelUsuariosComponent } from './pages/painel-usuarios/painel-usuarios.component';
import { PainelTurmasComponent } from './pages/painel-turmas/painel-turmas.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { LoginComponent } from './pages/login/login.component';
import { PainelDisciplinasComponent } from './pages/painel-disciplinas/painel-disciplinas.component';
import { PainelItensDisciplinasComponent } from './pages/painel-itens-disciplinas/painel-itens-disciplinas.component';

@NgModule({
  declarations: [
    AppComponent,
    PainelUsuariosComponent,
    PainelTurmasComponent,
    SidebarComponent,
    LoginComponent,
    PainelDisciplinasComponent,
    PainelItensDisciplinasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
