import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly url = 'https://jsonplaceholder.typicode.com/users'
  private http = inject(HttpClient)

  users = signal<User[]>([]);
  nameSearched = signal('');
  usersFiltered = computed(() =>
    this.users().filter(user => user.name.includes(this.nameSearched()))
  );

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
      tap((users) => {
          this.users.set(users)
      })
    )
  }

  setNameSearched(val: string) {
    this.nameSearched.set(val);
  }
}
