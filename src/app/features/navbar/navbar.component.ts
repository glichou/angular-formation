import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-navbar',
  template: `
    <h1>{{ title | uppercase }} - {{ price | currency:'EUR':'code' }}</h1>
    <app-search [userName]="name" (applySearch)="listenSearch($event)" />
    <button routerLink="/login">Se connecter</button>
  `, // view
  standalone: true,
  imports: [SearchComponent, UpperCasePipe, CurrencyPipe, RouterLink],
})
export class NavbarComponent {
  // model
  title = 'Mon App';
  name = 'ben';
  price = 15;

  listenSearch(userName: string) {
    console.log(userName);
  }
}
