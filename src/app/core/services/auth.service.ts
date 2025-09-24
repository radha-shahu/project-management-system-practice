import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router){}
  
  login(userName: string, password: string): void {
    if (userName == 'admin' && password == 'admin') {
      this.router.navigate(['/Home']);
    }
  }
}
