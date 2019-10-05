import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemDisciplina } from '../interfaces/item-disciplina';

@Injectable({ providedIn: 'root' })
export class ItemDisciplinaService {

  private apiUrl = 'http://localhost:8080/api';

  private user = 12052019;

  constructor(private httpClient: HttpClient) { }

  public listarTodos() {
    return this.httpClient.get(`${this.apiUrl}/itens-disciplinas`);
  }

  public adicionar(itemDisciplina: ItemDisciplina) {
    return this.httpClient.post(`${this.apiUrl}/item-disciplina?user=${this.user}`, itemDisciplina);
  }

  public atualizar(itemDisciplina: ItemDisciplina) {
    return this.httpClient.put(`${this.apiUrl}/item-disciplina?user=${this.user}`, itemDisciplina);
  }

  public excluir(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/item-disciplina/${id}?user=${this.user}`)
  }

  public buscar(id: number) {
    return this.httpClient.get(`${this.apiUrl}/item-disciplina/${id}`);
  }

  public listarPorDisciplina(disciplinaId: number) {
    return this.httpClient.get(`${this.apiUrl}/disciplina/${disciplinaId}/itens-disciplina`);
  }

}