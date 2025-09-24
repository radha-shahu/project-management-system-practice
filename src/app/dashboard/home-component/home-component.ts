import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [MatButtonModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {
  constructor(private router: Router) {
    
  }
  onCreateProject() {
    console.log('HomeComponent: Navigating to create project');
    this.router.navigate(['/Project/create']);
  }
}
