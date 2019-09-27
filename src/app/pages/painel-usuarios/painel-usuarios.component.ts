import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-painel-usuarios',
  templateUrl: './painel-usuarios.component.html',
  styleUrls: ['./painel-usuarios.component.scss']
})
export class PainelUsuariosComponent implements OnInit {

  usuario: Usuario = {};
  usuarios: Usuario[] = [];
  alertHidden: boolean = true;
  mesmaSenha: boolean = true;
  senha: string = null;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.listar();
  }

  exibirAlert(mensagem: string, tipo: string) {
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

  camposPreenchidos() {
    let valores = Object.values(this.usuario);
    if (valores.length < 4 || this.usuario.senha == null) {
      this.exibirAlert('Preencha todos os campos.', 'warning');
      return false;
    }
    return true;
  }

  alterarSenha() {
    this.mesmaSenha = false;
    this.senha = this.usuario.senha;
    this.usuario.senha = null;
  }

  manterSenha() {
    this.mesmaSenha = true;
    this.usuario.senha = this.senha;
  }

  listar() {
    this.usuarioService.listarTodos()
      .subscribe(dados => this.usuarios = <Usuario[]>dados);
  }

  carregar(username: string) {
    this.usuarioService.buscar(username)
      .subscribe(resposta => {
        this.usuario = resposta;
        if (!this.mesmaSenha)
          this.alterarSenha();
      });
  }

  limpar() {
    this.usuario = {};
    this.mesmaSenha = true;
  }

  adicionar() {
    if (this.camposPreenchidos()) {
      this.usuarioService.adicionar(this.usuario)
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
          });
    }
  }

  atualizar() {
    if (this.camposPreenchidos()) {
      this.usuarioService.atualizar(this.usuario)
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
          });
    }
  }

  excluir() {
    if (this.camposPreenchidos()) {
      this.usuarioService.excluir(this.usuario.id)
        .subscribe(() => {
          this.usuario = {};
          this.exibirAlert('Usuário excluído com sucesso!', 'success');
          this.listar();
        },
          response => this.exibirAlert(response.error.message, 'danger'));
    }
  }

}
