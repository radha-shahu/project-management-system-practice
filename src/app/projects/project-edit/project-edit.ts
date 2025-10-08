import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  MinLengthValidator,
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
import { Router, ActivatedRoute } from '@angular/router';
import { minDateGapValidator } from '../../validators/min-date-gap-validator';

@Component({
  selector: 'app-project-edit',
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
  templateUrl: './project-edit.html',
  styleUrl: './project-edit.scss',
  providers: [DatePipe],
})
export class ProjectEdit implements OnInit {
  projectForm: FormGroup;
  projectId: number = 0;
  projectData: ProjectData | null = null;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    // private validator: MinLengthValidator
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
    validator: minDateGapValidator(2),
  });
  }

  ngOnInit() {
    this.projectId = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    console.log('Project ID', this.projectId);
    this.projectData = this.projectService.getProjectById(this.projectId);
    console.log('Project Data', this.projectData);
    if (this.projectData) {
      this.populateForm();
    }
  }

  populateForm() {
    if (this.projectData) {
      this.projectForm.patchValue({
        projectName: this.projectData.name,
        description: this.projectData.description,
        startDate: new Date(this.projectData.startDate as string),
        endDate: new Date(this.projectData.endDate as string)
      });
    }
  }

  updateProject() {
    const projectName = this.projectForm.get('projectName')?.value;
    const projectDescription = this.projectForm.get('description')?.value;
    const projectStartDate = this.projectForm.get('startDate')?.value;
    const formattedStartDate =
      this.datePipe.transform(projectStartDate, 'shortDate') ?? '';
    const projectEndDate = this.projectForm.get('endDate')?.value;
    const formattedEndDate =
      this.datePipe.transform(projectEndDate, 'shortDate') ?? '';

    console.log(
      'Update Project',
      projectName,
      projectDescription,
      formattedStartDate,
      formattedEndDate
    );

    this.projectService.updateProject(
      this.projectId,
      projectName,
      projectDescription,
      formattedStartDate,
      formattedEndDate,
      []
    );
    this.router.navigate(['/project/list']);
  }

  onCancel() {
    this.router.navigate(['/project/list']);
  }
}