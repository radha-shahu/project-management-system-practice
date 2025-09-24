import { Component, provideAppInitializer } from '@angular/core';
import { Project, ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'app-project-list',
  imports: [],
  templateUrl: './project-list.html',
  styleUrl: './project-list.scss'
})
export class ProjectList {
  projects: Project[] = [];
  constructor(private projectService: ProjectService, private projectCount: Number){}

   ngOnInit(): void {
    this.fetchProject();
  }
  
  fetchProject(){
    var projectList =  this.projectService.fetchProject();
  }

  saveProject(){
    var projectSaveStatus = this.projectService.createProject('project1','','','xyz');
    if(projectSaveStatus == true){
        // show saved meesage
    } else {
      // show save failed message
    }
  }


}