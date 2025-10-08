import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TeamList } from './team-list';
import { TeamService } from '../services/team.service';

describe('TeamList', () => {
    let component: TeamList;
    let fixture: ComponentFixture<TeamList>;
    let teamService: TeamService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TeamList],
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

        fixture = TestBed.createComponent(TeamList);
        component = fixture.componentInstance;
        teamService = TestBed.inject(TeamService);
        router = TestBed.inject(Router);

    });




    it('should call teamService.fetchAllTeamMembers on init', () => {
        spyOn(teamService, 'fetchAllTeamMembers').and.returnValue([]);

        component.fetchTeamMembersFromStorage();

        expect(teamService.fetchAllTeamMembers).toHaveBeenCalled();
    });

    it('should navigate to add team member when onAddTeamMember is called', () => {
        component.onAddTeamMember();

        expect(router.navigate).toHaveBeenCalledWith(['/team/add']);
    });
});
