import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header-component',
  imports: [MatButtonModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  constructor(private router: Router, private authService: AuthService) {
    router

  }

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
