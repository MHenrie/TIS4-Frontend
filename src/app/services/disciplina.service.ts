import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Disciplina } from '../interfaces/disciplina';

@Injectable({ providedIn: 'root' })
export class DisciplinaService {

  private apiUrl = 'http://localhost:8080/api';

  private user = 12052019;

  constructor(private httpClient: HttpClient) { }

  public listarTodas() {
    return this.httpClient.get(`${this.apiUrl}/disciplinas`);
  }

  public adicionar(disciplina: Disciplina) {
    return this.httpClient.post(`${this.apiUrl}/disciplina?user=${this.user}`, disciplina);
  }

  public atualizar(disciplina: Disciplina) {
    return this.httpClient.put(`${this.apiUrl}/disciplina?user=${this.user}`, disciplina);
  }

  public excluir(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/disciplina/${id}?user=${this.user}`);
  }

  public buscar(id: number) {
    return this.httpClient.get(`${this.apiUrl}/disciplina/${id}`);
  }

  public listarPorSerie(serie: string) {
    return this.httpClient.get(`${this.apiUrl}/disciplinas/${serie}`);
  }

}