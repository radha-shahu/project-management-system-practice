import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'app-project-create',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './project-create.html',
  styleUrl: './project-create.scss'
})
export class ProjectCreate {
  projectForm: FormGroup;
  constructor(private fb: FormBuilder, private projectService: ProjectService){
    this.projectForm = this.fb.group({
      projectName:[],
      description:[],
      startDate:[],
      endDate:[]
    })
  }

  saveProject(){
    const projectName =  this.projectForm.get('email')?.value;
    const projectDescription =  this.projectForm.get('email')?.value;
    const projectStartDate =  this.projectForm.get('email')?.value;
    const projectEndDate =  this.projectForm.get('email')?.value;

    const projectSaveStatus = this.projectService.createProject(projectName, projectStartDate, projectEndDate, projectDescription);
    
  }
}