import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit {

  public nomeCompleto: string = '';

  constructor() { }

  ngOnInit() {
    this.nomeCompleto = localStorage.getItem('Nome');
  }

  public logout(): void {
    localStorage.removeItem('LoginBuenoBrandao');
    localStorage.removeItem('Nome');
    localStorage.removeItem('Username');
    localStorage.removeItem('Tipo');
    localStorage.removeItem('ID');
    open('/login', '_self')
  }

}
