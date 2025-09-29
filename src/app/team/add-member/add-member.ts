import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TeamService } from '../services/team.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../shared/header-component/header-component";
import { SidebarComponent } from "../../shared/sidebar-component/sidebar-component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'add-member',
    templateUrl: './add-member.html',
    styleUrls: ['./add-member.scss'],
    imports: [ReactiveFormsModule, CommonModule, HeaderComponent, SidebarComponent,
        MatFormFieldModule,MatInputModule, MatSelectModule, MatButtonModule
    ]
})
export class AddMember {
    listOfRoles = ['Scrum Master', 'Product Owner', 'Developer', 'Tester'];
    teamMemberForm: FormGroup;

    constructor(private fb: FormBuilder, private teamService: TeamService, private router: Router) {
        this.teamMemberForm = this.fb.group({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            role: new FormControl('', [Validators.required])
        });
    }

    onSubmit() {
        if (this.teamMemberForm.valid) {
            console.log(this.teamMemberForm.value);
            this.teamService.saveTeamMember(this.teamMemberForm.value.name, this.teamMemberForm.value.email, this.teamMemberForm.value.role);
            this.router.navigate(['/team/list']);
        } else {
            console.log('Form is invalid');
        }
    }
}
