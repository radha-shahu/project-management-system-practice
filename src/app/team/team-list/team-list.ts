import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SidebarComponent } from '../../shared/sidebar-component/sidebar-component';
import { HeaderComponent } from '../../shared/header-component/header-component';
import { TeamService } from '../services/team.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'team-list',
  styleUrl: 'team-list.scss',
  templateUrl: 'team-list.html',
  imports: [
    MatTableModule,
    MatSortModule,
    HeaderComponent,
    SidebarComponent,
    CommonModule,
    FontAwesomeModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class TeamList implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);
  faTrash = faTrash;
  teamMembers: TeamMember[] = [];
  displayedColumns: string[] = ['name', 'email', 'role','action'];
  dataSource = new MatTableDataSource(this.teamMembers);

  @ViewChild(MatSort) sort!: MatSort;
  constructor(private teamService: TeamService, private router: Router) {}

  ngOnInit() {
    this.fetchTeamMembersFromStorage();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  fetchTeamMembersFromStorage() {
    this.teamMembers = this.teamService.fetchAllTeamMembers();
    this.dataSource.data = this.teamMembers;
  }
  onDeleteTeamMember(employeeId : number){
    console.log('Team delete Id', employeeId)
    const result = this.teamService.deleteTeam(employeeId);
    if(result){
      this.fetchTeamMembersFromStorage();
    }
}
  onAddTeamMember() {
    this.router.navigate(['/team/add']);
  }
}

export class TeamMember {
  employeeId: number = 0;
  name: string = '';
  email: string = '';
  role: string = '';
}
