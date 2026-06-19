import { Component, inject }
  from '@angular/core';



import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
}
  from '@angular/forms';

import { Router, RouterLink }
  from '@angular/router';

import { AuthService }
  from '../../../../core/services/auth';

@Component({

  selector: 'app-login',

  standalone: true,

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl:
    './login.component.html',

  styleUrl:
    './login.component.scss'
})
export class LoginComponent {

  private fb =
    inject(FormBuilder);

  private auth =
    inject(AuthService);

  private router =
    inject(Router);

  form = this.fb.group({

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      Validators.required
    ]

  });

  login() {

    if (this.form.invalid)
      return;

    this.auth.login(
      this.form.getRawValue() as any
    )
      .subscribe({

        next: () => {

          this.router.navigate([
            '/dashboard'
          ]);

        },

        error: console.error

      });
  }
}