import { Component, ViewChild, viewChild } from '@angular/core';
import { HeaderComponent } from '../../shared/header-component/header-component';
import { SidebarComponent } from '../../shared/sidebar-component/sidebar-component';
import { TeamService } from '../services/team.service';
import { TeamMember } from '../team-list/team-list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-assign-team',
  imports: [HeaderComponent, SidebarComponent, MatTableModule, MatCheckboxModule],
  templateUrl: './assign-team.html',
  styleUrl: './assign-team.scss',
})
export class AssignTeam {
  teamMembers: TeamMember[] = [];

  displayedColumns: string[] = ['name', 'email', 'role', 'select'];

  dataSource = new MatTableDataSource(this.teamMembers);
  selection = new SelectionModel<TeamMember>(true, []);

  constructor(private teamService: TeamService) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.onGetTeamMember();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  onGetTeamMember() {
    const teamList = this.teamService.fetchAllTeamMembers();
    this.teamMembers = teamList;
    this.dataSource.data = this.teamMembers
    console.log(this.teamMembers, 'List of team members');
  }

  getSelected() {
    console.log('Selected:', this.selection.selected);
  }
}
