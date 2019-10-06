import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public usuario: Usuario = {};
  public alertHidden: boolean = true;

  private subscription: Subscription;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private exibirAlert(mensagem: string, tipo: string): void {
    let alert = document.querySelector('#alert');
    let color = `alert-${tipo}`;
    alert.textContent = mensagem;
    alert.classList.add(color);
    this.alertHidden = false;
    setTimeout(() => {
      this.alertHidden = true;
      alert.classList.remove(color);
    }, 4000);
  }

  private camposPreenchidos(): boolean {
    let valores = Object.values(this.usuario);
    if (valores.length < 2) {
      this.exibirAlert('Preencha todos os campos.', 'warning');
      return false;
    }
    return true;
  }

  public autenticar() {
    if (this.camposPreenchidos())
      this.subscription = this.usuarioService.autenticar(this.usuario)
        .subscribe(objeto => {
          this.usuario = {};
          alert(`Bem-vindo(a) ${(<Usuario>objeto).nomeCompleto}!`)
          localStorage.setItem('LoginBuenoBrandao','true');
          localStorage.setItem('Nome',`${(<Usuario>objeto).nomeCompleto}`);
          localStorage.setItem('Username', `${(<Usuario>objeto).username}`);
          localStorage.setItem('Tipo', `${(<Usuario>objeto).tipo}`);
          localStorage.setItem('ID', `${(<Usuario>objeto).id}`);
          if(`${(<Usuario>objeto).tipo}` == "Administrador"){
            open("/usuarios","_self")
          }
        },
          resposta => this.exibirAlert(resposta.error.message, 'danger'));
  }

}
