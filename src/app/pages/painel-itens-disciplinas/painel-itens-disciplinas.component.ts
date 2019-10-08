import { Component, OnInit } from '@angular/core';
import { ItemDisciplinaService } from 'src/app/services/item-disciplina.service';
import { ItemDisciplina } from 'src/app/interfaces/item-disciplina';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-painel-itens-disciplinas',
  templateUrl: './painel-itens-disciplinas.component.html',
  styleUrls: ['./painel-itens-disciplinas.component.scss']
})
export class PainelItensDisciplinasComponent implements OnInit {

  openModal = false;
  openModalDelete = false;
  titleModal = "";
  isNewDisciplina = false;
  public itemDisciplina: ItemDisciplina = {};
  public itensDisciplinas: ItemDisciplina[] = [];
  public alertHidden: boolean = true;

  private subscriptions: Subscription[] = [];

  constructor(private itemService: ItemDisciplinaService) { }

  ngOnInit() {
    this.listarTodos();
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

  public fecharModal(){
    this.openModal=false;
    this.openModalDelete = false;
  }

  public abrirModal(){
    this.openModal=true;
  }

  public novoItemDisciplina(){
    this.titleModal = "Cadastro de Item"
    this.isNewDisciplina = true;
  }
  public updateItemDisciplina(){
    this.titleModal = "Atualização de Item"
    this.isNewDisciplina = false;
  }
  public abrirModalDelete() {
    this.openModalDelete = true;
    
    this.titleModal = "Voce realmente deseja excuir esse item  ?"
  }
}
