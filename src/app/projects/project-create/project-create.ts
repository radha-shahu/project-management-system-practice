import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  ProjectData,
  ProjectService,
} from '../../core/services/project.service';
import { HeaderComponent } from '../../shared/header-component/header-component';
import { SidebarComponent } from '../../shared/sidebar-component/sidebar-component';
import { CommonModule, DatePipe } from '@angular/common';
import { Route, Router } from '@angular/router';
import { minDateGapValidator } from '../../validators/min-date-gap-validator';

@Component({
  selector: 'app-project-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HeaderComponent,
    SidebarComponent,
  ],
  templateUrl: './project-create.html',
  styleUrl: './project-create.scss',
  providers: [DatePipe],
})
export class ProjectCreate {
  projectForm: FormGroup;
  projectList: ProjectData[] = [];
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      projectName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(/^[A-Za-z ]+$/),
        ],
      ],
      description: ['', []],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    },
  {
        validators: minDateGapValidator(2)
      });
  }

  saveProject() {
    const projectName = this.projectForm.get('projectName')?.value;
    const projectDescription = this.projectForm.get('description')?.value;
    const projectStartDate = this.projectForm.get('startDate')?.value;
    const formattedStartDate =
      this.datePipe.transform(projectStartDate, 'shortDate') ?? '';
    const projectEndDate = this.projectForm.get('endDate')?.value;
    const formattedEndDate =
      this.datePipe.transform(projectEndDate, 'shortDate') ?? '';
    console.log(
      'Save Project',
      projectName,
      projectDescription,
      formattedStartDate,
      formattedEndDate
    );
    this.projectService.createProject(
      projectName,
      projectDescription,
      formattedStartDate,
      formattedEndDate
    );
    this.router.navigate(['/projects'])
  }
  
  onCancel(){
    this.router.navigate(['/home']);
  }
}
