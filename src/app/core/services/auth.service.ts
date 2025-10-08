import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: string = 'AUTH_TOKEN';

  constructor(private router: Router) {}

  login(userName: string, password: string): void {
    if (userName == 'admin@a.com' && password == 'Admin@12') {
      localStorage.setItem('authTokenKey', this.authToken);
      console.log('Login Successfull');

      this.router.navigate(['/home']);
    } else {
      console.log('Login Failed');
    }
  }
  logout() {
    localStorage.removeItem('authTokenKey');
  }

  isloggedIn() {
    return localStorage.getItem('authTokenKey');
  }
}
