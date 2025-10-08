import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';

import { ProjectEdit } from './project-edit';
import { ProjectService } from '../../core/services/project.service';

describe('ProjectEdit', () => {
  let component: ProjectEdit;
  let fixture: ComponentFixture<ProjectEdit>;
  let projectService: ProjectService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectEdit, ReactiveFormsModule],
      providers: [
        ProjectService,
        DatePipe,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            events: of(),
            url: '/test',
            routerState: { root: {} }
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
              paramMap: {
                get: jasmine.createSpy('get').and.returnValue('123')
              }
            },
            params: of({}),
            queryParams: of({}),
            fragment: of(null),
            data: of({})
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectEdit);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
    router = TestBed.inject(Router);
  });


  it('should call projectService.updateProject when updateProject is called', () => {
    spyOn(projectService, 'updateProject');

    component.projectForm.patchValue({
      projectName: 'Updated Project',
      description: 'Updated Description',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31')
    });

    component.updateProject();

    expect(projectService.updateProject).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/projects']);
  });

  it('should navigate to projects list when onCancel is called', () => {
    component.onCancel();

    expect(router.navigate).toHaveBeenCalledWith(['/projects']);
  });

  it('should populate form when populateForm is called', () => {
    component.projectData = {
      id: 123,
      name: 'Test Project',
      description: 'Test Description',
      startDate: '1/1/2024',
      endDate: '1/31/2024',
      teamMembers: []
    };

    component.populateForm();

    expect(component.projectForm.get('projectName')?.value).toBe('Test Project');
    expect(component.projectForm.get('description')?.value).toBe('Test Description');
  });
});
