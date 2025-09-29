import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['admin@a.com', [Validators.required, Validators.email]],
      password: [
        'Admin@12',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
          ),
        ],
      ],
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login successfull', this.loginForm.value);
      this.authService.login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      );
    } else {
      console.log('Login failed');
    }
  }
}
