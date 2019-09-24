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

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.listar();
  }

  exibirAlert(mensagem: string) {
    document.querySelector('#alert').textContent = mensagem;
    this.alertHidden = false;
    setTimeout(() => {
      this.alertHidden = true;
    }, 5000);
  }

  listar() {
    this.usuarioService.listar().subscribe(dados => this.usuarios = <Usuario[]>dados);
  }

  adicionar() {
    this.usuarioService.adicionar(this.usuario).subscribe(
      user => {
        this.usuario = {};
        this.exibirAlert('Usuário cadastrado com sucesso!');
        this.listar();
      },
      result => {
        this.exibirAlert(result.error.message);
      })
  }

  atualizar() {
    this.usuarioService.atualizar(this.usuario).subscribe(() => {
      this.usuario = {};
      this.exibirAlert('Usuário atualizado com sucesso!');
      this.listar();
    },
      result => {
        this.exibirAlert(result.error.message);
      })
  }

  excluir() {
    this.usuarioService.excluir(this.usuario.id).subscribe(() => {
      this.usuario = {};
      this.exibirAlert('Usuário excluído com sucesso!');
      this.listar();
    })
  }

  carregar(username: string) {
    this.usuarioService.buscar(username).subscribe(resposta => this.usuario = resposta);
  }

  limpar() {
    this.usuario = {};
  }

}
