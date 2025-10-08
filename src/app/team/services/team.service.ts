import { TeamMember } from '../team-list/team-list';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  fetchAllTeamMembers(): TeamMember[] {
    const teamMembers = localStorage.getItem('TeamListDataKey');
    if (teamMembers != null) {
      const parsedTeamMembers: TeamMember[] = JSON.parse(teamMembers);
      console.log('parsed Team members', parsedTeamMembers);
      return parsedTeamMembers;
    } else {
      return [];
    }
  }

  saveTeamMember(name: string, email: string, role: string) {
    const teamMembers = localStorage.getItem('TeamListDataKey');
    if (teamMembers != null) {
      const parsedTeamMembers: TeamMember[] = JSON.parse(teamMembers);
      const newTeamMember: TeamMember = {
        employeeId: Math.floor(Math.random() * 1000000),
        name: name,
        email: email,
        role: role,
      };
      parsedTeamMembers.push(newTeamMember);
      localStorage.setItem(
        'TeamListDataKey',
        JSON.stringify(parsedTeamMembers)
      );
    } else {
      const teamMembers: TeamMember[] = [];
      const newTeamMember: TeamMember = {
        employeeId: Math.floor(Math.random() * 1000000),
        name: name,
        email: email,
        role: role,
      };
      teamMembers.push(newTeamMember);
      localStorage.setItem('TeamListDataKey', JSON.stringify(teamMembers));
    }
  }

  deleteTeam(employeeId: number): boolean {
    const data = localStorage.getItem('TeamListDataKey');
    if (data != null) {
      const parsedTeam: TeamMember[] = JSON.parse(data);
      const index = parsedTeam.findIndex((x) => x.employeeId === employeeId);
      if (index !== -1) {
        parsedTeam.splice(index, 1);
        localStorage.setItem('TeamListDataKey', JSON.stringify(parsedTeam));
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
