import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';

import { ProjectCreate } from './project-create';
import { ProjectService } from '../../core/services/project.service';

describe('ProjectCreate', () => {
    let component: ProjectCreate;
    let fixture: ComponentFixture<ProjectCreate>;
    let projectService: ProjectService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProjectCreate, ReactiveFormsModule],
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
                        snapshot: { params: {} },
                        params: of({}),
                        queryParams: of({}),
                        fragment: of(null),
                        data: of({})
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProjectCreate);
        component = fixture.componentInstance;
        projectService = TestBed.inject(ProjectService);
        router = TestBed.inject(Router);

    });

    it('should have project name field with validators', () => {
        const projectNameControl = component.projectForm.get('projectName');
        expect(projectNameControl?.hasError('required')).toBeTruthy();

        projectNameControl?.setValue('abc');
        expect(projectNameControl?.hasError('minlength')).toBeTruthy();

        projectNameControl?.setValue('Test Project');
        expect(projectNameControl?.hasError('minlength')).toBeFalsy();
    });


    it('should have start date field with required validator', () => {
        const startDateControl = component.projectForm.get('startDate');
        expect(startDateControl?.hasError('required')).toBeTruthy();
    });


    it('should have end date field with required validator', () => {
        const endDateControl = component.projectForm.get('endDate');
        expect(endDateControl?.hasError('required')).toBeTruthy();
    });

    it('should call projectService.createProject when form is valid', () => {
        spyOn(projectService, 'createProject');

        component.projectForm.patchValue({
            projectName: 'Test Project',
            description: 'Test Description',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-01-31')
        });

        component.saveProject();

        expect(projectService.createProject).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/projects']);
    });

    it('should navigate to home when cancel is clicked', () => {
        component.onCancel();

        expect(router.navigate).toHaveBeenCalledWith(['/home']);
    });

});
