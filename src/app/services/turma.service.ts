import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Turma } from '../interfaces/turma';

@Injectable({ providedIn: 'root' })
export class TurmaService {

  private apiUrl = 'http://localhost:8080/api';

  private user = 12052019;

  constructor(private httpClient: HttpClient) { }

  public listar() {
    return this.httpClient.get(`${this.apiUrl}/turmas`);
  }

  public adicionar(turma: Turma) {
    return this.httpClient.post(`${this.apiUrl}/turma?user=${this.user}`, turma);
  }

  public atualizar(turma: Turma) {
    return this.httpClient.put(`${this.apiUrl}/turma?user=${this.user}`, turma);
  }

  public excluir(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/turma/${id}?user=${this.user}`);
  }

  public buscar(id: number) {
    return this.httpClient.get(`${this.apiUrl}/turma/${id}`);
  }

}