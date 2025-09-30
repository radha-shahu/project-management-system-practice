import { Injectable } from '@angular/core';
import { TeamMember } from '../../team/team-list/team-list';

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
        id: Date.now(),
        name: name,
        description: description,
        startDate: startDate,
        endDate: endDate,
        teamMembers: [],
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
        id: Date.now(),
        name: name,
        description: description,
        startDate: startDate,
        endDate: endDate,
        teamMembers: [],
      };
      projectList.push(projectDetails);
      localStorage.setItem('projectsDataKey', JSON.stringify(projectList));
    }
  }

  fetchAllProjects(): ProjectData[] {
    const data = localStorage.getItem('projectsDataKey');
    if (data != null) {
      const parsedJson: ProjectData[] = JSON.parse(data);
      console.log('parsed Project details', parsedJson);
      return parsedJson;
    } else {
      return [];
    }
  }

  updateProject(id: number, name: String, description: String, startDate: String, endDate: String, teamMembers: TeamMember[]) {
    const data = localStorage.getItem('projectsDataKey');
    if (data != null) {
      var parsedJson: ProjectData[] = JSON.parse(data);
      var project = parsedJson.findIndex(project => project.id === id);
      if (project !== -1) {
        parsedJson[project].name = name;
        parsedJson[project].description = description;
        parsedJson[project].startDate = startDate;
        parsedJson[project].endDate = endDate;
        parsedJson[project].teamMembers = teamMembers;
      }

      localStorage.setItem('projectsDataKey', JSON.stringify(parsedJson));
    }
  }

  updateProjectTeamMembers(id: number, teamMembers: TeamMember[]) {
    const data = localStorage.getItem('projectsDataKey');
    if (data != null) {
      var parsedJson: ProjectData[] = JSON.parse(data);
      var index = parsedJson.findIndex(project => project.id === id);
      if (index !== -1) {
        parsedJson[index].teamMembers = teamMembers;
      }
      localStorage.setItem('projectsDataKey', JSON.stringify(parsedJson));
    }

  }

  getProjectById(id: number): ProjectData {
    const data = localStorage.getItem('projectsDataKey');
    console.log('Project Data', data);
    if (data != null) {
      const parsedJson: ProjectData[] = JSON.parse(data);
      console.log('Parsed Project Data', parsedJson);
      const project = parsedJson.find(p => p.id === id);
      if (project) {
        return project;
      } else {
        return { id: 0, name: '', description: '', startDate: '', endDate: '', teamMembers: [] };
      }
    } else {
      return { id: 0, name: '', description: '', startDate: '', endDate: '', teamMembers: [] };
    }
  }

  deleteProject(id: number): boolean {
    const data = localStorage.getItem('projectsDataKey');
    if (data != null) {
      var parsedJson: ProjectData[] = JSON.parse(data);
      const index = parsedJson.findIndex(project => project.id === id);
      if (index !== -1) {
        parsedJson.splice(index, 1);
      }
      localStorage.setItem('projectsDataKey', JSON.stringify(parsedJson));
      return true;
    } else {
      return false;
    }
  }
}

export interface ProjectData {
  id: number;
  name: String;
  description: String;
  startDate: String;
  endDate: String;
  teamMembers: TeamMember[];
}
