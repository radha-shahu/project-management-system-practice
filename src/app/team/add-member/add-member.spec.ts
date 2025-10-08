import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AddMember } from './add-member';
import { TeamService } from '../services/team.service';

describe('AddMember', () => {
    let component: AddMember;
    let fixture: ComponentFixture<AddMember>;
    let teamService: TeamService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddMember, ReactiveFormsModule],
            providers: [
                TeamService,
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

        fixture = TestBed.createComponent(AddMember);
        component = fixture.componentInstance;
        teamService = TestBed.inject(TeamService);
        router = TestBed.inject(Router);
    });



    it('should have name field with required validator', () => {
        const nameControl = component.teamMemberForm.get('name');
        expect(nameControl?.hasError('required')).toBeTruthy();
    });

    it('should have email field with required and email validators', () => {
        const emailControl = component.teamMemberForm.get('email');
        expect(emailControl?.hasError('required')).toBeTruthy();

        emailControl?.setValue('invalid-email');
        expect(emailControl?.hasError('email')).toBeTruthy();
    });

    it('should have role field with required validator', () => {
        const roleControl = component.teamMemberForm.get('role');
        expect(roleControl?.hasError('required')).toBeTruthy();
    });

    it('should call teamService.saveTeamMember when form is valid', () => {
        spyOn(teamService, 'saveTeamMember');

        component.teamMemberForm.patchValue({
            name: 'John Doe',
            email: 'john@example.com',
            role: 'Developer'
        });

        component.onSubmit();

        expect(teamService.saveTeamMember).toHaveBeenCalledWith('John Doe', 'john@example.com', 'Developer');
        expect(router.navigate).toHaveBeenCalledWith(['/team/list']);
    });

    it('should not call teamService.saveTeamMember when form is invalid', () => {
        spyOn(teamService, 'saveTeamMember');

        component.onSubmit();

        expect(teamService.saveTeamMember).not.toHaveBeenCalled();
    });


});
