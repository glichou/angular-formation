import { AfterContentInit, Component, ContentChild, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../core/interfaces/user.interface';
import { LangPipe } from '../../../shared/pipes/lang.pipe';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-user-card',
  template: `
    <article>
      <ng-content select="h1" />
      <header>{{ user.name }}</header>
      {{ user.email }}
      <ng-content select="h2" />
      <footer>
        <button 
          confirm="Etes vous sur de" 
          [confirmUsername]="user.name"
          (applyConfirm)="removeUser()"
        >{{ 'REMOVE' | lang:'fr' }}</button>
        <button [routerLink]="['user', user.id]">Modifier</button>
      </footer>
    </article>
  `,
  standalone: true,
  imports: [LangPipe, RouterLink, SharedModule]
})
export class UserCardComponent implements OnDestroy, AfterContentInit {
  @Input() user: User = {} as User;
  @Output() remove: EventEmitter<number> = new EventEmitter()
  @ContentChild('title') myTitle!: ElementRef
  @ContentChild('subtitle') subTitle!: ElementRef

  removeUser() {
    this.remove.emit(this.user.id)
  }

  ngAfterContentInit(): void {
      console.log(this.myTitle.nativeElement)
  }

  ngOnDestroy(): void {
      
  }
}
