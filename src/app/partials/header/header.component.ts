import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
 
})
export class HeaderComponent implements OnInit {

  nomeCompleto ="";
  constructor() { }

  ngOnInit() {
    this.nomeCompleto = localStorage.getItem('Nome')
  }

  public logout(){
    localStorage.setItem('LoginBuenoBrandao','false');
    localStorage.setItem('Nome',"");
    localStorage.setItem('Username', "");
    localStorage.setItem('Tipo', "");
    localStorage.setItem('ID', "");
    open('/login','_self')
  }
}
