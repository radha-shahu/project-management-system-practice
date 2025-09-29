import { Component } from '@angular/core';
import { ButtonComponent } from "../../shared/button-component/button-component";
import { HeaderComponent } from "../../shared/header-component/header-component";
import { SidebarComponent } from "../../shared/sidebar-component/sidebar-component";

@Component({
  selector: 'app-project-edit',
  imports: [ HeaderComponent, SidebarComponent],
  templateUrl: './project-edit.html',
  styleUrl: './project-edit.scss'
})
export class ProjectEdit {

}
