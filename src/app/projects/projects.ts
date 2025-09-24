import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Project, ProjectService } from '../core/services/project.service';

@Component({
  selector: 'app-projects',
  imports: [MatButtonModule, MatTableModule,MatFormField,MatLabel,MatInputModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})

export class Projects {
   projects: Project[] = [];
  constructor(private router: Router, private projectService: ProjectService){}
  onCreateProject(){
    this.router.navigate(['/Project/create']);
  }
  displayedColumns: string[] = ['position', 'name', 'startDate', 'endDate', 'description'];
  dataSource = new MatTableDataSource(this.projects);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.fetchProject();
  }

  fetchProject(){
    const fetchedProjects = this.projectService.fetchProject();
    this.projects = fetchedProjects;
  }
}
