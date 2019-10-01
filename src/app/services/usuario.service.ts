import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/api';

  private user = 12052019;

  constructor(private httpClient: HttpClient) { }

  public listarTodos() {
    return this.httpClient.get(`${this.apiUrl}/usuarios`);
  }

  public adicionar(usuario: Usuario) {
    return this.httpClient.post(`${this.apiUrl}/usuario?adm=${this.user}`, usuario);
  }

  public atualizar(usuario: Usuario) {
    return this.httpClient.put(`${this.apiUrl}/usuario?adm=${this.user}`, usuario);
  }

  public excluir(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/usuario?id=${id}&adm=${this.user}`);
  }

  public buscar(username: String) {
    return this.httpClient.get(`${this.apiUrl}/usuario?username=${username}`);
  }

  public listarProfessores() {
    return this.httpClient.get(`${this.apiUrl}/professores`);
  }

  public listarSupervisores() {
    return this.httpClient.get(`${this.apiUrl}/supervisores`);
  }

}