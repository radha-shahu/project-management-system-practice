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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TeamMember } from '../../team/team-list/team-list';
import { CommonModule } from '@angular/common';
import { MatInputModule } from "@angular/material/input";
library.add(faClock, faCircleInfo, faUsers, faUserPlus, faPenToSquare, faTrash)
@Component({
  selector: 'app-project-details',
  imports: [
    HeaderComponent,
    SidebarComponent,
    MatButtonModule,
    MatCardModule,
    FontAwesomeModule,
    MatTableModule,
    CommonModule,
    MatInputModule
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
  teamColumns: string[] = ['name', 'role'];
  teamMembers: TeamMember[] = [];
  dataSource = new MatTableDataSource(this.teamMembers);
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
      this.teamMembers = this.projectData.teamMembers;
      this.dataSource.data = this.teamMembers;
    }
  }

  onBackToList() {
    this.router.navigate(['/projects'])
  }

  onProjectEdit(id: number) {
    console.log('project edit id', id);
    this.router.navigate(['/project/edit', id])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onProjectDelete(id: number) {
    console.log('project delete id', id);
    const result = this.projectService.deleteProject(id);
    if (result) {
      this.router.navigate(['/projects'])
    }
  }

  onManageTeam() {
    this.router.navigate(['/team/assign', this.projectId]);
  }
}
