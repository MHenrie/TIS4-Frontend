import { Component, OnInit, OnDestroy } from '@angular/core';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { Disciplina } from 'src/app/interfaces/disciplina';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-painel-disciplinas',
  templateUrl: './painel-disciplinas.component.html',
  styleUrls: ['./painel-disciplinas.component.scss']
})
export class PainelDisciplinasComponent implements OnInit, OnDestroy {

  titleModal = "";
  openModal = false;
  openModalDelete = false;
  isNewDisciplina = false;
  public disciplina: Disciplina = {};
  public disciplinas: Disciplina[] = [];
  public alertHidden: boolean = true;

  private subscriptions: Subscription[] = [];

  constructor(private disciplinaService: DisciplinaService) { }

  ngOnInit() {
    this.listarTodas();
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
    let valores = Object.values(this.disciplina);
    if (valores.length < 3) {
      this.exibirAlert('Preencha todos os campos.', 'warning');
      return false;
    }
    return true;
  }

  public listarTodas(): void {
    this.subscriptions.push(this.disciplinaService.listarTodas()
      .subscribe(lista => this.disciplinas = <Disciplina[]>lista));
  }

  public carregar(id: number): void {
    this.subscriptions.push(this.disciplinaService.buscar(id)
      .subscribe(objeto => this.disciplina = objeto));
  }

  public limpar(): void {
    this.disciplina = {};
  }

  public adicionar(): void {
    if (this.camposPreenchidos())
      this.subscriptions.push(this.disciplinaService.adicionar(this.disciplina)
        .subscribe(() => {
          this.disciplina = {};
          this.exibirAlert('Disciplina cadastrada com sucesso!', 'success');
          this.listarTodas();
        },
          resposta => this.exibirAlert(resposta.error.message, 'danger')));
  }

  public atualizar(): void {
    if (this.camposPreenchidos())
      this.subscriptions.push(this.disciplinaService.atualizar(this.disciplina)
        .subscribe(() => {
          this.disciplina = {};
          this.exibirAlert('Disciplina atualizada com sucesso!', 'success');
          this.listarTodas();
        },
          resposta => this.exibirAlert(resposta.error.message, 'danger')));
  }

  public excluir(): void {
    if (this.camposPreenchidos())
      this.subscriptions.push(this.disciplinaService.excluir(this.disciplina.id)
        .subscribe(() => {
          this.disciplina = {};
          this.exibirAlert('Disciplina excluída com sucesso!', 'success');
          this.listarTodas();
        },
          resposta => this.exibirAlert(resposta.error.message, 'danger')));
  }

  public fecharModal(){
    this.openModal=false;
    this.openModalDelete = false;
  }

  public abrirModal(){
    this.openModal=true;
  }

  public novaDisciplina(){
    this.titleModal = "Cadastro de Disciplina"
    this.isNewDisciplina = true;
  }
  public updateDisciplina(){
    this.titleModal = "Atualização de Disciplina"
    this.isNewDisciplina = false;
  }
  public abrirModalDelete() {
    this.openModalDelete = true;
    
    this.titleModal = "Voce realmente deseja excuir essa disciplina ?"
  }
}
