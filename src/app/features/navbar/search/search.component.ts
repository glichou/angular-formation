import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  template: `
    <input type="text" [(ngModel)]="userName" />
    @if (userName != '') {
        <button (click)="search()">Rechercher</button>
    }
    <!-- <button (click)="search()" *ngIf="userName != ''">Rechercher</button> -->
    <ul>
        @for (name of names ; track $index) {
            <li>{{ name }}</li>
        }
        <!-- <li *ngFor="let name of names ; let i = index">
            {{ i }} - {{ name }}
        </li> -->
    </ul>
  `,
  standalone: true,
  imports: [FormsModule,/*NgIf,*/ /*NgFor*/],
})
export class SearchComponent {
  @Input() userName = '';
  @Output() applySearch: EventEmitter<string> = new EventEmitter();
  names: string[] = ['ana', 'ben', 'jim']

  search() {
    this.applySearch.emit(this.userName);
  }
}
