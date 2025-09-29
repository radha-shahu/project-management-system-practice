import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../shared/header-component/header-component";
import { SidebarComponent } from "../../shared/sidebar-component/sidebar-component";

@Component({
  selector: 'app-home-component',
  imports: [MatButtonModule, HeaderComponent, SidebarComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {
  constructor(private router: Router) {
    
  }
  onCreateProject() {
    console.log('HomeComponent: Navigating to create project');
    this.router.navigate(['/project/create']);
  }
}
