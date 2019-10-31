import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemTurmaService } from 'src/app/services/item-turma.service';
import { ItemTurma } from 'src/app/interfaces/item-turma';
import { Subscription } from 'rxjs';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { Disciplina } from 'src/app/interfaces/disciplina';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit, OnDestroy {

  public openModal: boolean = false;
  public openModalDelete: boolean = false;
  public titleModal: string = '';
  public itemTurma: ItemTurma = {};
  public itensTurma: ItemTurma[] = [];
  public alertHidden: boolean = true;
  public disciplinas: Disciplina[] = [];

  public turmaId: number = 1;
  private subscriptions: Subscription[] = [];

  constructor(private itemService: ItemTurmaService, private disciplinaService: DisciplinaService) { }

  ngOnInit() {

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

  // private camposPreenchidos(): boolean {
  //   let valores = Object.values(this.itemTurma);
  //   if (valores.length < 4) {
  //     this.exibirAlert('Preencha todos os campos.', 'warning');
  //     return false;
  //   }
  //   return true;
  // }

  public listarPorDisciplina(disciplinaId: number): void {
    this.subscriptions.push(this.itemService.listarPorDisciplinaAndTurma(disciplinaId, this.turmaId)
      .subscribe(lista => this.itensTurma = <ItemTurma[]>lista));
  }

  public carregarItem(id: number): void {
    this.subscriptions.push(this.itemService.buscarItemCompleto(id)
      .subscribe(objeto => this.itemTurma = objeto));
  }

  public carregarDescricao(id: number): void {
    this.subscriptions.push(this.itemService.buscarItemDescricao(id)
      .subscribe(descricao => this.itemTurma.descricao = <string>descricao));
  }

  public atualizarStatus(id: number, status: string): void {
    this.subscriptions.push(this.itemService.atualizarStatus(id, status)
      .subscribe(() => alert("Status atualizado!"), () => alert("Erro ao atualizar status!")));
  }

  public limpar(): void {
    this.itemTurma = {};
  }

  public adicionar(): void {
    // if (this.camposPreenchidos())
    this.subscriptions.push(this.itemService.adicionar(this.itemTurma)
      .subscribe(() => {
        this.itemTurma = {};
        this.exibirAlert('Item cadastrado com sucesso!', 'success');

      },
        resposta => this.exibirAlert(resposta.error.message, 'danger')));
  }

  public editar(): void {
    // if (this.camposPreenchidos())
    this.subscriptions.push(this.itemService.editar(this.itemTurma)
      .subscribe(() => {
        this.itemTurma = {};
        this.exibirAlert('Item atualizado com sucesso!', 'success');

      },
        resposta => this.exibirAlert(resposta.error.message, 'danger')));
  }

  public excluir(): void {
    // if (this.camposPreenchidos())
    this.subscriptions.push(this.itemService.excluir(this.itemTurma.id)
      .subscribe(() => {
        this.itemTurma = {};
        this.exibirAlert('Item excluído com sucesso!', 'success');

      },
        resposta => this.exibirAlert(resposta.error.message, 'danger')));
  }

  public listarDisciplinas(): void {
    this.subscriptions.push(this.disciplinaService.listarTodas()
      .subscribe(lista => this.disciplinas = <Disciplina[]>lista));
  }

}
