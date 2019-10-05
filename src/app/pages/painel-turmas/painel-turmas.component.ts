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
          this.exibirAlert('Turma excluída com sucesso!', 'success');
          this.listarTurmas();
        },
          resposta => this.exibirAlert(resposta.error.message, 'danger')));
  }

}
