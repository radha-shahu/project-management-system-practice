import { ChangeDetectorRef, Component, ViewChild, viewChild } from '@angular/core';
import { HeaderComponent } from '../../shared/header-component/header-component';
import { SidebarComponent } from '../../shared/sidebar-component/sidebar-component';
import { TeamService } from '../services/team.service';
import { TeamMember } from '../team-list/team-list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../core/services/project.service';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-assign-team',
  imports: [HeaderComponent, SidebarComponent, MatTableModule, MatCheckboxModule,MatButtonModule, MatSortModule],
  templateUrl: './assign-team.html',
  styleUrl: './assign-team.scss',
})
export class AssignTeam {
  allTeamMembers: TeamMember[] = [];
  projectId: number = 0;
  projectTeamMembers: TeamMember[] = [];

  displayedColumns: string[] = ['name', 'email', 'role', 'select'];

  dataSource = new MatTableDataSource(this.allTeamMembers);
  selection = new SelectionModel<TeamMember>(true, []);

  constructor(private teamService: TeamService, private router: Router, private projectService: ProjectService, private route: ActivatedRoute, private cdRef: ChangeDetectorRef) {
    this.projectId = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    console.log('Project ID', this.projectId);
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.getAllTeamMembers();
    this.getProjectTeamMembers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  getAllTeamMembers() {
    const teamList = this.teamService.fetchAllTeamMembers();
    this.allTeamMembers = teamList;
    this.dataSource.data = this.allTeamMembers
    console.log(this.allTeamMembers, 'List of team members');
  }

  getProjectTeamMembers() {
    const projectData = this.projectService.getProjectById(this.projectId);
    this.projectTeamMembers = projectData.teamMembers;
    this.selection.clear();

    this.projectTeamMembers.forEach(projectMember => {
      const matchingMember = this.allTeamMembers.find(member =>
        member.email === projectMember.email || member.employeeId === projectMember.employeeId
      );
      if (matchingMember) {
        this.selection.select(matchingMember);
      }
    });
    this.cdRef.detectChanges();
  }

  getSelected() {
    console.log('Selected:', this.selection.selected);
  }

  onCancel() {
    this.router.navigate(['/project/view', this.projectId]);
  }

  assignTeam() {
    const selectedTeamMembers = this.selection.selected;

    this.projectService.updateProjectTeamMembers(this.projectId, selectedTeamMembers);

    this.router.navigate(['/project/view', this.projectId]);
  }
}
