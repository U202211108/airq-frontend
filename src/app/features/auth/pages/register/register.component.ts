import { Component, inject } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',

  standalone: true,

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './register.component.html',

  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private fb =
    inject(FormBuilder);

  form = this.fb.group({

    fullName: [
      '',
      Validators.required
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8)
      ]
    ],

    confirmPassword: [
      '',
      Validators.required
    ]

  });

  register() {

    if (this.form.invalid)
      return;

    console.log(
      this.form.getRawValue()
    );
  }
}