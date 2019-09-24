import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PainelUsuariosComponent } from './pages/painel-usuarios/painel-usuarios.component';
import { PainelTurmasComponent } from './pages/painel-turmas/painel-turmas.component';

@NgModule({
  declarations: [
    AppComponent,
    PainelUsuariosComponent,
    PainelTurmasComponent
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
