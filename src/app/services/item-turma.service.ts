import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemTurma } from '../interfaces/item-turma';
import { ItemDisciplinaService } from './item-disciplina.service';

@Injectable({ providedIn: 'root' })
export class ItemTurmaService {

  private apiUrl = 'http://localhost:8080/api';

  private user = 12052019;

  constructor(private httpClient: HttpClient, private iDisciplinaService: ItemDisciplinaService) { }

  public listarPorDisciplinaAndTurma(disciplinaId: number, turmaId: number) {
    return this.httpClient.get(`${this.apiUrl}disciplina/${disciplinaId}/turma/${turmaId}/itens-turma`);
  }

  public adicionar(itemTurma: ItemTurma) {
    return this.httpClient.post(`${this.apiUrl}/item-turma?user=${this.user}`, itemTurma);
  }

  public atualizarStatus(id: number, status: string) {
    return this.httpClient.put(`${this.apiUrl}/item-turma/${id}?user=${this.user}`, status);
  }

  public excluir(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/item-turma/${id}?user=${this.user}`)
  }

  public buscarItemCompleto(id: number) {
    return this.httpClient.get(`${this.apiUrl}/item-turma/${id}`);
  }

  public buscarItemDescricao(id: number) {
    return this.httpClient.get(`${this.apiUrl}/item-turma/${id}/descricao`);
  }

  public editar(itemTurma: ItemTurma) {
    return this.iDisciplinaService.atualizar(itemTurma);
  }

}