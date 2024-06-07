import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../core/interfaces/user.interface';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
})
export class UserEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService)
  private builder = inject(FormBuilder)

  user: User = {} as User
  propName = new FormControl()
  form = this.builder.group({
    name: this.propName,
    email: '',
    username: ''
  })

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.userService.get(id).subscribe((user) => {
      this.user = user
      //this.propName.setValue(this.user.name)
      this.form.patchValue(this.user)
    })
  }
}
