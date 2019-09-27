import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Turma } from '../interfaces/turma';

@Injectable({ providedIn: 'root' })
export class TurmaService {

  apiUrl = 'http://localhost:8080/api';

  user = 12052019;

  constructor(private httpClient: HttpClient) { }

  listar() {
    return this.httpClient.get(`${this.apiUrl}/turmas`);
  }

  adicionar(turma: Turma) {
    return this.httpClient.post(`${this.apiUrl}/turma?adm=${this.user}`, turma);
  }

  atualizar(turma: Turma) {
    return this.httpClient.put(`${this.apiUrl}/turma?adm=${this.user}`, turma);
  }

  excluir(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/turma?id=${id}&adm=${this.user}`);
  }

  buscar(id: number) {
    return this.httpClient.get(`${this.apiUrl}/turma?id=${id}`);
  }


}