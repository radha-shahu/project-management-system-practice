import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header-component/header-component";
import { SidebarComponent } from "../../shared/sidebar-component/sidebar-component";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fa0, faCircleInfo, faClock, faPenToSquare, faTrash, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
library.add(faClock,faCircleInfo,faUsers, faUserPlus, faPenToSquare, faTrash)
@Component({
  selector: 'app-project-details',
  imports: [
    HeaderComponent, 
    SidebarComponent,
    MatButtonModule,
    MatCardModule,
    FontAwesomeModule
  ],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss'
})
export class ProjectDetails {
faClock = faClock;
faCircleInfo = faCircleInfo;
faUsers = faUsers;
faUserPlus = faUserPlus;
faPenToSquare = faPenToSquare;
faTrash = faTrash;

constructor(private router: Router){

}
onBackToList(){
  this.router.navigate(['/projects'])
}
}
