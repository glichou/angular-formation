import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, WritableSignal, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppService } from '../../core/services/app.service';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-navbar',
  template: `
    <h1>{{ title() | uppercase }} - {{ price | currency:'EUR':'code' }}</h1>
    <app-search [userName]="name" (applySearch)="listenSearch($event)" />
    <button routerLink="/login">Se connecter</button>
    <button (click)="changeTitle()">Changer titre</button>
  `, // view
  standalone: true,
  imports: [SearchComponent, UpperCasePipe, CurrencyPipe, RouterLink],
})
export class NavbarComponent {
  private appService = inject(AppService)

  // model
  title: WritableSignal<string> = this.appService.title;
  name = 'ben';
  price = 15;

  constructor() {
    effect(() => {
      console.log(this.title())
    })
  }

  listenSearch(userName: string) {
    console.log(userName);
  }

  changeTitle() {
    this.appService.setTitle(''+Math.random())
  }
}
