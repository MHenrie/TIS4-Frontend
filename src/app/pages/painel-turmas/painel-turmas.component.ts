import { Component, OnInit } from '@angular/core';
import { TurmaService } from 'src/app/services/turma.service';
import { Turma } from 'src/app/interfaces/turma';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-painel-turmas',
  templateUrl: './painel-turmas.component.html',
  styleUrls: ['./painel-turmas.component.scss']
})
export class PainelTurmasComponent implements OnInit {

  turma: Turma = {};
  turmas: Turma[] = [];
  professores: Usuario[] = [];
  supervisores: Usuario[] = [];
  alertHidden: boolean = true;

  constructor(private turmaService: TurmaService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.listar();
    this.listarProfessores();
    this.listarSupervisores();
  }

  exibirAlert(mensagem: string, tipo: string) {
    let alert = document.querySelector('#alertTurma');
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
    let valores = Object.values(this.turma);
    if (valores.length < 5) {
      this.exibirAlert('Preencha todos os campos.', 'warning');
      return false;
    }
    return true;
  }

  listar() {
    this.turmaService.listar()
      .subscribe(dados => this.turmas = <Turma[]>dados);
  }

  listarProfessores() {
    this.usuarioService.listarProfessores()
      .subscribe(resposta => this.professores = <Usuario[]>resposta);
  }

  listarSupervisores() {
    this.usuarioService.listarSupervisores()
      .subscribe(resposta => this.supervisores = <Usuario[]>resposta);
  }

  carregar(id: number) {
    this.turmaService.buscar(id)
      .subscribe(resposta => this.turma = resposta);
  }

  limpar() {
    this.turma = {};
  }

  adicionar() {
    if (this.camposPreenchidos())
      this.turmaService.adicionar(this.turma)
        .subscribe(() => {
          this.turma = {};
          this.exibirAlert('Turma cadastrada com sucesso!', 'success');
          this.listar();
        },
          response => {
            if (response.status == 400)
              this.exibirAlert('Preencha todos os campos.', 'warning');
            else
              this.exibirAlert(response.error.message, 'danger');
          });
  }

  atualizar() {
    if (this.camposPreenchidos())
      this.turmaService.atualizar(this.turma)
        .subscribe(() => {
          this.turma = {};
          this.exibirAlert('Turma atualizada com sucesso!', 'success');
          this.listar();
        },
          response => {
            if (response.status == 400)
              this.exibirAlert('Preencha todos os campos.', 'warning');
            else
              this.exibirAlert(response.error.message, 'danger');
          });
  }

  excluir() {
    if (this.camposPreenchidos())
      this.turmaService.excluir(this.turma.id)
        .subscribe(() => {
          this.turma = {};
          this.exibirAlert('Turma excluída com sucesso!', 'success');
          this.listar();
        },
          response => this.exibirAlert(response.error.message, 'danger'));
  }

}
