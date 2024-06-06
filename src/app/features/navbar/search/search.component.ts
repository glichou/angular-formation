import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompletePipe } from '../../../shared/pipes/autocomplete.pipe';

@Component({
  selector: 'app-search',
  template: `
    <input type="text" [(ngModel)]="userName" />
    @if (userName != '') {
        <button (click)="search()">Rechercher</button>
    }
    <!-- <button (click)="search()" *ngIf="userName != ''">Rechercher</button> -->
    <ul>
        @for (name of names | autocomplete:userName ; track $index) {
            <li>{{ name }}</li>
        }
        <!-- <li *ngFor="let name of names ; let i = index">
            {{ i }} - {{ name }}
        </li> -->
    </ul>
  `,
  standalone: true,
  imports: [FormsModule,/*NgIf,*/ /*NgFor*/ AutoCompletePipe],
})
export class SearchComponent implements OnInit {
  @Input() userName = '';
  @Output() applySearch: EventEmitter<string> = new EventEmitter();
  names: string[] = ['ana', 'ben', 'jim']

  ngOnInit() {
    console.log(this.userName)
  }

  search() {
    this.applySearch.emit(this.userName);
  }
}
