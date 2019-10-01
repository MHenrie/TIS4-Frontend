import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-painel-usuarios',
  templateUrl: './painel-usuarios.component.html',
  styleUrls: ['./painel-usuarios.component.scss']
})
export class PainelUsuariosComponent implements OnInit, OnDestroy {

  public usuario: Usuario = {};
  public usuarios: Usuario[] = [];
  public alertHidden: boolean = true;
  public mesmaSenha: boolean = true;
  private senha: string = null;

  private subscriptions: Subscription[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.listar();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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
    if (valores.length < 4 || this.usuario.senha == null) {
      this.exibirAlert('Preencha todos os campos.', 'warning');
      return false;
    }
    return true;
  }

  public alterarSenha(): void {
    this.mesmaSenha = false;
    this.senha = this.usuario.senha;
    this.usuario.senha = null;
  }

  public manterSenha(): void {
    this.mesmaSenha = true;
    this.usuario.senha = this.senha;
  }

  public listar(): void {
    this.subscriptions.push(this.usuarioService.listarTodos()
      .subscribe(dados => this.usuarios = <Usuario[]>dados));
  }

  public carregar(username: string): void {
    this.subscriptions.push(this.usuarioService.buscar(username)
      .subscribe(resposta => {
        this.usuario = resposta;
        if (!this.mesmaSenha)
          this.alterarSenha();
      }));
  }

  public limpar(): void {
    this.usuario = {};
    this.mesmaSenha = true;
  }

  public adicionar(): void {
    if (this.camposPreenchidos()) {
      this.subscriptions.push(this.usuarioService.adicionar(this.usuario)
        .subscribe(() => {
          this.usuario = {};
          this.exibirAlert('Usuário cadastrado com sucesso!', 'success');
          this.listar();
        },
          response => {
            if (response.status == 400)
              this.exibirAlert('Preencha todos os campos.', 'warning');
            else
              this.exibirAlert(response.error.message, 'danger');
          }));
    }
  }

  public atualizar(): void {
    if (this.camposPreenchidos()) {
      this.subscriptions.push(this.usuarioService.atualizar(this.usuario)
        .subscribe(() => {
          this.usuario = {};
          this.exibirAlert('Usuário atualizado com sucesso!', 'success');
          this.mesmaSenha = true;
          this.listar();
        },
          response => {
            if (response.status == 400)
              this.exibirAlert('Preencha todos os campos.', 'warning');
            else
              this.exibirAlert(response.error.message, 'danger');
          }));
    }
  }

  public excluir(): void {
    if (this.camposPreenchidos()) {
      this.subscriptions.push(this.usuarioService.excluir(this.usuario.id)
        .subscribe(() => {
          this.usuario = {};
          this.exibirAlert('Usuário excluído com sucesso!', 'success');
          this.listar();
        },
          response => this.exibirAlert(response.error.message, 'danger')));
    }
  }

}
