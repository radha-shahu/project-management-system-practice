import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header-component/header-component";
import { SidebarComponent } from "../../shared/sidebar-component/sidebar-component";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fa0, faCircleInfo, faClock, faPenToSquare, faTrash, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectData, ProjectService } from '../../core/services/project.service';
library.add(faClock, faCircleInfo, faUsers, faUserPlus, faPenToSquare, faTrash)
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
  projectId: number = 0;
  projectData: ProjectData | null = null;
  projectName: String = '';
  projectDescription: String = '';
  projectStartDate: String = '';
  projectEndDate: String = '';
  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService) {

  }

  ngOnInit() {
    this.projectId = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    this.projectData = this.projectService.getProjectById(this.projectId);
    console.log('Project Data', this.projectData);

    if (this.projectData) {
      this.projectName = this.projectData.name;
      this.projectDescription = this.projectData.description;
      this.projectStartDate = this.projectData.startDate;
      this.projectEndDate = this.projectData.endDate;
    }
  }

  onBackToList() {
    this.router.navigate(['/projects'])
  }


}
