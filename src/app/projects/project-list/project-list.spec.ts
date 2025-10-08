import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjectList } from './project-list';
import { ProjectService } from '../../core/services/project.service';

describe('ProjectList', () => {
    let component: ProjectList;
    let fixture: ComponentFixture<ProjectList>;
    let projectService: ProjectService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProjectList],
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
                        snapshot: { params: {} },
                        params: of({}),
                        queryParams: of({}),
                        fragment: of(null),
                        data: of({})
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProjectList);
        component = fixture.componentInstance;
        projectService = TestBed.inject(ProjectService);
        router = TestBed.inject(Router);
    });





    it('should navigate to project view when onProjectView is called', () => {
        component.onProjectView(123);

        expect(router.navigate).toHaveBeenCalledWith(['/project/view', 123]);
    });

    it('should navigate to project edit when onProjectEdit is called', () => {
        component.onProjectEdit(123);

        expect(router.navigate).toHaveBeenCalledWith(['/project/edit', 123]);
    });

    it('should call projectService.deleteProject when onProjectDelete is called', () => {
        spyOn(projectService, 'deleteProject').and.returnValue(true);
        spyOn(component, 'fetchProjectsFromStorage');

        component.onProjectDelete(123);

        expect(projectService.deleteProject).toHaveBeenCalledWith(123);
        expect(component.fetchProjectsFromStorage).toHaveBeenCalled();
    });

    it('should navigate to create project when onCreateProject is called', () => {
        component.onCreateProject();

        expect(router.navigate).toHaveBeenCalledWith(['/project/create']);
    });

});
