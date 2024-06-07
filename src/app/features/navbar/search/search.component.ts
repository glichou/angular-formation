import { Component, EventEmitter, Input, OnInit, Output, Signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
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
        @for (name of names() | autocomplete:userName ; track $index) {
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
  private userService = inject(UserService)

  @Input() userName = '';
  @Output() applySearch: EventEmitter<string> = new EventEmitter();
  names: Signal<string[]> = computed(
      () => this.userService.users().map(user => user.name)
  )

  ngOnInit() {
    console.log(this.userName)
  }

  search() {
    this.applySearch.emit(this.userName);
  }
}
