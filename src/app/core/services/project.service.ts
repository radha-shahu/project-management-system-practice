import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  
  createProject(
    name: String,
    description: String,
    startDate: String,
    endDate: String
  ) {
    var existingProjects = localStorage.getItem('projectsDataKey');
    console.log('existing Project details', existingProjects);

    if (existingProjects != null) {
      const parsedProjectList: ProjectData[] = JSON.parse(existingProjects);
      console.log('parsed Project details', parsedProjectList);

      const projectCount = parsedProjectList.length;

      const newProject: ProjectData = {
        id: projectCount + 1,
        name: name,
        description: description,
        startDate: startDate,
        endDate: endDate,
      };
      console.log('New Project details', newProject);

      parsedProjectList.push(newProject);
      console.log('parsed Project details', parsedProjectList);

      localStorage.setItem(
        'projectsDataKey',
        JSON.stringify(parsedProjectList)
      );
    } else {
      var projectList: ProjectData[] = [];
      var projectDetails: ProjectData = {
        id: 1,
        name: name,
        description: description,
        startDate: startDate,
        endDate: endDate,
      };
      projectList.push(projectDetails);
      localStorage.setItem('projectsDataKey', JSON.stringify(projectList));
    }
  }

  fetchProject(): ProjectData[] {
    const data = localStorage.getItem('projectsDataKey');
    if (data != null) {
      const parsedJson: ProjectData[] = JSON.parse(data);
      console.log('parsed Project details', parsedJson);
      return parsedJson;
    } else {
      return [];
    }
  }
}

export interface ProjectData {
  id: Number;
  name: String;
  description: String;
  startDate: String;
  endDate: String;
}
