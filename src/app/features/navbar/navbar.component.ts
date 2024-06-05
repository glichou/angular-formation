import { Component } from '@angular/core';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-navbar',
  template: `
    <h1>{{ title }}</h1>
    <app-search [userName]="name" (applySearch)="listenSearch($event)" />
  `, // view
  standalone: true,
  imports: [SearchComponent],
})
export class NavbarComponent {
  // model
  title = 'Mon App';
  name = 'ben';

  listenSearch(userName: string) {
    console.log(userName);
  }
}
