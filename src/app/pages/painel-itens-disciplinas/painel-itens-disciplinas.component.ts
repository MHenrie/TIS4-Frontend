import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemDisciplinaService } from 'src/app/services/item-disciplina.service';
import { ItemDisciplina } from 'src/app/interfaces/item-disciplina';
import { Subscription } from 'rxjs';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { Disciplina } from 'src/app/interfaces/disciplina';

@Component({
  selector: 'app-painel-itens-disciplinas',
  templateUrl: './painel-itens-disciplinas.component.html',
  styleUrls: ['./painel-itens-disciplinas.component.scss']
})
export class PainelItensDisciplinasComponent implements OnInit, OnDestroy {

  public openModal: boolean = false;
  public openModalDelete: boolean = false;
  public titleModal: string = '';
  public isNewDisciplina: boolean = false;
  public itemDisciplina: ItemDisciplina = {};
  public itensDisciplinas: ItemDisciplina[] = [];
  public alertHidden: boolean = true;
  public disciplinas: Disciplina[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private itemService: ItemDisciplinaService, private disciplinaService: DisciplinaService) { }

  ngOnInit() {
    this.listarTodos();
    this.listarDisciplinas();
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
    let valores = Object.values(this.itemDisciplina);
    if (valores.length < 4) {
      this.exibirAlert('Preencha todos os campos.', 'warning');
      return false;
    }
    return true;
  }

  public listarTodos(): void {
    this.subscriptions.push(this.itemService.listarTodos()
      .subscribe(lista => this.itensDisciplinas = <ItemDisciplina[]>lista));
  }

  public carregar(id: number): void {
    this.subscriptions.push(this.itemService.buscar(id)
      .subscribe(objeto => this.itemDisciplina = objeto));
  }

  public limpar(): void {
    this.itemDisciplina = {};
  }

  public adicionar(): void {
    if (this.camposPreenchidos())
      console.log(this.itemDisciplina);
    this.subscriptions.push(this.itemService.adicionar(this.itemDisciplina)
      .subscribe(() => {
        this.itemDisciplina = {};
        this.exibirAlert('Item cadastrado com sucesso!', 'success');
        this.listarTodos();
      },
        resposta => this.exibirAlert(resposta.error.message, 'danger')));
  }

  public atualizar(): void {
    if (this.camposPreenchidos())
      this.subscriptions.push(this.itemService.atualizar(this.itemDisciplina)
        .subscribe(() => {
          this.itemDisciplina = {};
          this.exibirAlert('Item atualizado com sucesso!', 'success');
          this.listarTodos();
        },
          resposta => this.exibirAlert(resposta.error.message, 'danger')));
  }

  public excluir(): void {
    if (this.camposPreenchidos())
      this.subscriptions.push(this.itemService.excluir(this.itemDisciplina.id)
        .subscribe(() => {
          this.itemDisciplina = {};
          this.exibirAlert('Item excluído com sucesso!', 'success');
          this.listarTodos();
        },
          resposta => this.exibirAlert(resposta.error.message, 'danger')));
  }

  public listarDisciplinas(): void {
    this.subscriptions.push(this.disciplinaService.listarTodas()
      .subscribe(lista => this.disciplinas = <Disciplina[]>lista));
  }

  public fecharModal(): void {
    this.openModal = false;
    this.openModalDelete = false;
  }

  public abrirModal(): void {
    this.openModal = true;
  }

  public novoItemDisciplina(): void {
    this.titleModal = "Cadastro de Item"
    this.isNewDisciplina = true;
  }

  public updateItemDisciplina(): void {
    this.titleModal = "Atualização de Item"
    this.isNewDisciplina = false;
  }

  public abrirModalDelete(): void {
    this.openModalDelete = true;
    this.titleModal = "Voce realmente deseja excluir este item?"
  }

}
