import { Component, OnDestroy, OnInit, Signal, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../core/interfaces/user.interface';
import { UserService } from '../../core/services/user.service';
import { ExtensionPipe } from '../../shared/pipes/extension.pipe';
import { PluralPipe } from '../../shared/pipes/plural.pipe';
import { UserCardComponent } from './user-card/user-card.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  standalone: true,
  imports: [UserCardComponent, PluralPipe, FormsModule, ExtensionPipe],
})
export class UsersComponent implements OnInit, OnDestroy {
  private userService = inject(UserService)
  nbSelected = 0;
  extSelected = '';
  extensions: string[] = ['tv', 'biz', 'io', 'me'];
  users: Signal<User[]> = this.userService.usersFiltered
  loading = false
  // subscription!: Subscription

  //constructor(private userService: UserService) { }

  ngOnInit() {
    //this.userService.getAll().subscribe()

    // this.subscription = interval(1000).subscribe((nb) => {
    //   console.log(nb)
    // })
  }

  ngOnDestroy(): void {
      // this.subscription.unsubscribe()
  }

  createUser(form: NgForm) {
    if (form.invalid) return
    this.loading = true
    this.userService.create(form.value).subscribe(() => {
      this.loading = false
      form.resetForm()
    })
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe()
  }
}
