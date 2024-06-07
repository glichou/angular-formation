import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent  {
  propEmail = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  propPass = new FormControl()
  myForm = new FormGroup({
    email: this.propEmail,
    password: this.propPass
  })
  submitted = false

  login() {
    this.submitted = true
    if (this.myForm.invalid) return
    console.log(this.myForm.value)
  }
}
