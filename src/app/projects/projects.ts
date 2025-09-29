import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectData, ProjectService } from '../core/services/project.service';
import { HeaderComponent } from '../shared/header-component/header-component';
import { SidebarComponent } from '../shared/sidebar-component/sidebar-component';
import { ProjectList } from './project-list/project-list';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ProjectDetails } from "./project-details/project-details";

@Component({
  selector: 'app-projects',
  imports: [CommonModule, HeaderComponent, SidebarComponent, ProjectList, MatButtonModule, ProjectDetails],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  parentProjectList: ProjectData[] = [];

  constructor(private router: Router, private projectService: ProjectService) {}

  onCreateProject() {
    this.router.navigate(['/project/create']);
  }

  ngOnInit(): void {
    this.fetchProjectsFromStorage();
  }

  fetchProjectsFromStorage() {
    this.parentProjectList = this.projectService.fetchProject();
    console.log('fetched prj details', this.parentProjectList);
  }
}
