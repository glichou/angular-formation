import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Signal,
  computed,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { AutoCompletePipe } from '../../../shared/pipes/autocomplete.pipe';

@Component({
  selector: 'app-search',
  template: `
    <input type="text" [formControl]="propUserName" />
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
  imports: [ReactiveFormsModule, /*NgIf,*/ /*NgFor*/ AutoCompletePipe],
})
export class SearchComponent implements OnInit {
  private userService = inject(UserService);

  propUserName = new FormControl();
  @Input() userName = '';
  @Output() applySearch: EventEmitter<string> = new EventEmitter();
  names: Signal<string[]> = computed(() =>
    this.userService.users().map((user) => user.name)
  );

  ngOnInit() {
    this.propUserName.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe((val) => {
      this.userName = val;
      console.log(val)
    });
  }

  search() {
    this.applySearch.emit(this.userName);
  }
}
