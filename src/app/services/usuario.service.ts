import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  apiUrl = 'http://localhost:8080/api';

  user = 12052019;

  constructor(private httpClient: HttpClient) { }

  listarTodos() {
    return this.httpClient.get(`${this.apiUrl}/usuarios`);
  }

  adicionar(usuario: Usuario) {
    return this.httpClient.post(`${this.apiUrl}/usuario?adm=${this.user}`, usuario);
  }

  atualizar(usuario: Usuario) {
    return this.httpClient.put(`${this.apiUrl}/usuario?adm=${this.user}`, usuario);
  }

  excluir(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/usuario?id=${id}&adm=${this.user}`);
  }

  buscar(username: String) {
    return this.httpClient.get(`${this.apiUrl}/usuario?username=${username}`);
  }

  listarProfessores(){
    return this.httpClient.get(`${this.apiUrl}/professores`);
  }

  listarSupervisores(){
    return this.httpClient.get(`${this.apiUrl}/supervisores`);
  }

}