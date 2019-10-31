import { Component, OnInit, OnDestroy } from '@angular/core';
import { TurmaService } from 'src/app/services/turma.service';
import { Turma } from 'src/app/interfaces/turma';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-painel-turmas',
  templateUrl: './painel-turmas.component.html',
  styleUrls: ['./painel-turmas.component.scss']
})
export class PainelTurmasComponent implements OnInit, OnDestroy {

  public openModal: boolean = false;
  public openModalDelete: boolean = false;
  public titleModal: string = '';
  public isNewTurma: boolean = false;
  public turma: Turma = {};
  public turmas: Turma[] = [];
  public professores: Usuario[] = [];
  public supervisores: Usuario[] = [];
  public alertHidden: boolean = true;

  private subscriptions: Subscription[] = [];

  constructor(private turmaService: TurmaService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.listarTurmas();
    this.listarProfessores();
    this.listarSupervisores();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private exibirAlert(mensagem: string, tipo: string): void {
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

  private camposPreenchidos(): boolean {
    let valores = Object.values(this.turma);
    if (valores.length < 5) {
      this.exibirAlert('Preencha todos os campos.', 'warning');
      return false;
    }
    return true;
  }

  public listarTurmas(): void {
    this.subscriptions.push(this.turmaService.listar()
      .subscribe(lista => this.turmas = <Turma[]>lista));
  }

  public listarProfessores(): void {
    this.subscriptions.push(this.usuarioService.listarPorCategoria('professor')
      .subscribe(lista => this.professores = <Usuario[]>lista));
  }

  public listarSupervisores(): void {
    this.subscriptions.push(this.usuarioService.listarPorCategoria('supervisor')
      .subscribe(lista => this.supervisores = <Usuario[]>lista));
  }

  public carregar(id: number): void {
    this.subscriptions.push(this.turmaService.buscar(id)
      .subscribe(objeto => this.turma = objeto));
  }

  public limpar(): void {
    this.turma = {};
  }

  public adicionar(): void {
    console.log(this.turma);
    if (this.camposPreenchidos())
      this.subscriptions.push(this.turmaService.adicionar(this.turma)
        .subscribe(() => {
          this.turma = {};
          this.exibirAlert('Turma cadastrada com sucesso!', 'success');
          this.listarTurmas();
        },
          resposta => this.exibirAlert(resposta.error.message, 'danger')));
  }

  public atualizar(): void {
    if (this.camposPreenchidos())
      this.subscriptions.push(this.turmaService.atualizar(this.turma)
        .subscribe(() => {
          this.turma = {};
          this.exibirAlert('Turma atualizada com sucesso!', 'success');
          this.listarTurmas();
        },
          resposta => this.exibirAlert(resposta.error.message, 'danger')));
  }

  public excluir(): void {
    if (this.camposPreenchidos())
      this.subscriptions.push(this.turmaService.excluir(this.turma.id)
        .subscribe(() => {
          this.turma = {};
          //this.exibirAlert('Turma excluída com sucesso!', 'success');

          alert("Turma Excluída")
          this.openModalDelete = false;
          this.listarTurmas();
        },
          resposta => this.exibirAlert(resposta.error.message, 'danger')));
  }

  public fecharModal(): void {
    this.openModal = false;
    this.openModalDelete = false;
  }

  public abrirModal(): void {
    this.openModal = true;
  }

  public novaTurma(): void {
    this.titleModal = "Cadastro de Turmas"
    this.isNewTurma = true;
  }

  public updateTurma(): void {
    this.titleModal = "Atualização de Turma"
    this.isNewTurma = false;
  }

  public abrirModalDelete(): void {
    this.openModalDelete = true;
    this.titleModal = "Voce realmente deseja excuir esta turma?"
  }

}
