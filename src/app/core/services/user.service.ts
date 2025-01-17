import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

export type UserCreatePayload = Omit<User, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly url = 'https://jsonplaceholder.typicode.com/users';
  private http = inject(HttpClient);

  users = signal<User[]>([]);
  nameSearched = signal('');
  usersFiltered = computed(() =>
    this.users().filter((user) => user.name.includes(this.nameSearched()))
  );

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
      tap((users) => {
        this.users.set(users);
      })
    );
  }

  get(id: number): Observable<User> {
    return this.http.get<User>(this.url + '/' + id);
  }

  update(id: number, payload: UserCreatePayload): Observable<User> {
    return this.http.put<User>(this.url + '/' + id, payload).pipe(
      tap((userModified) => {
        const users = this.users().map((user) => {
          if (user.id == id) {
            return userModified;
          }
          return user;
        });
        //  const users = this.users().map(user => user.id == id ? userModified : user)
        this.users.set(users);
      })
    );
  }

  create(payload: UserCreatePayload): Observable<User> {
    return this.http.post<User>(this.url, payload).pipe(
      tap((user) => {
        this.users.set([...this.users(), user]);
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id).pipe(
      tap(() => {
        this.users.set(this.users().filter((user) => user.id != id));
      })
    );
  }

  setNameSearched(val: string) {
    this.nameSearched.set(val);
  }
}
