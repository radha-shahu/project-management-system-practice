import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { ProjectDetails } from './project-details';
import { ProjectService } from '../../core/services/project.service';

describe('ProjectDetails', () => {
  let component: ProjectDetails;
  let fixture: ComponentFixture<ProjectDetails>;
  let projectService: ProjectService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetails],
      providers: [
        ProjectService,
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

    fixture = TestBed.createComponent(ProjectDetails);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
    router = TestBed.inject(Router);
  });




  it('should navigate to projects list when onBackToList is called', () => {
    component.onBackToList();

    expect(router.navigate).toHaveBeenCalledWith(['/projects']);
  });

  it('should navigate to project edit when onProjectEdit is called', () => {
    component.onProjectEdit(123);

    expect(router.navigate).toHaveBeenCalledWith(['/project/edit', 123]);
  });

  it('should navigate to team assign when onManageTeam is called', () => {
    component.projectId = 456;
    component.onManageTeam();

    expect(router.navigate).toHaveBeenCalledWith(['/team/assign', 456]);
  });

  it('should call projectService.deleteProject when onProjectDelete is called', () => {
    spyOn(projectService, 'deleteProject').and.returnValue(true);

    component.onProjectDelete(123);

    expect(projectService.deleteProject).toHaveBeenCalledWith(123);
  });

  it('should navigate to projects list after successful deletion', () => {
    spyOn(projectService, 'deleteProject').and.returnValue(true);

    component.onProjectDelete(123);

    expect(router.navigate).toHaveBeenCalledWith(['/projects']);
  });

});
