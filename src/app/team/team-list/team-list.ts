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

@Component({
  selector: 'team-list',
  styleUrl: 'team-list.scss',
  templateUrl: 'team-list.html',
  imports: [MatTableModule, MatSortModule, HeaderComponent, SidebarComponent, CommonModule, FontAwesomeModule],
})
export class TeamList implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);
  teamMembers: TeamMember[] = [];
  displayedColumns: string[] = ['name', 'email', 'role'];
  dataSource = new MatTableDataSource(this.teamMembers);

  @ViewChild(MatSort) sort!: MatSort;
  constructor(private teamService: TeamService, private router: Router) {
    this.fetchTeamMembersFromStorage();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  fetchTeamMembersFromStorage() {
    this.teamMembers = this.teamService.fetchAllTeamMembers();
    this.dataSource.data = this.teamMembers;
  }

  onAddTeamMember() {
    this.router.navigate(['/team/add']);
  }
}



export class TeamMember {
  name: string = '';
  email: string = '';
  role: string = '';
}

