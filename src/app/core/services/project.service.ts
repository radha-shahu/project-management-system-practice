import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  
  createProject(name:String, startDate: String, endDate:String, description: String): boolean{
    // create project
    // save prject details to json 
    // check if json is present 
    // if json is not there, create one
    // then save current prj details
    // if json is already already there
    // then append the current proj to json
    var existingProjects = localStorage.getItem('projects');
    if(existingProjects != null){
      const parsedProjectList: Project[] = JSON.parse(existingProjects);
      const newProject : Project = {
      id: Date.now(),
      name : name,
      description : description,
      startDate: startDate,
      endDate: endDate
      };

      parsedProjectList.push(newProject);

      localStorage.setItem('projects', JSON.stringify(parsedProjectList));
      return true;
    }else{
      false;
    }
   

    
    return true;
  }

  fetchProject(): Project[] {
    // fetch project list from json
    // check if json is present then return empty array 
    // if json present fetch data and return project list
    const data = localStorage.getItem('projects');
    if(data != null){
      const parsedJson = JSON.parse(data);
      return parsedJson;
    }else{
      return [];
    }
    
  }
}

export interface Project {
  id?: Number;
  name: String;
  description?: String;
  startDate: String;
  endDate: String;
}


