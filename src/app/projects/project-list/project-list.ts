import {
  Component,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ProjectData,
} from '../../core/services/project.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisVertical, faEye, faMagnifyingGlass, faPen, faTrash,  } from '@fortawesome/free-solid-svg-icons';
import { MatDateSelectionModel } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header-component/header-component';
import { SidebarComponent } from '../../shared/sidebar-component/sidebar-component';
library.add(faPen, faTrash, faEye,faEllipsisVertical, faMagnifyingGlass);
@Component({
  selector: 'app-project-list',
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatLabel,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    FontAwesomeModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './project-list.html',
  styleUrl: './project-list.scss',
})
export class ProjectList {
  constructor(private router : Router){}
  faEye = faEye;
  faPen =faPen;
  faTrash =faTrash;
  faMagnifyingGlass =faMagnifyingGlass;
 faEllipsisVertical= faEllipsisVertical
  @Input() childProjectList: ProjectData[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  statusOptions = ['All Status', 'Active', 'Completed'];
  selectedStatus = 'All Status';
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'startDate',
    'status',
    'endDate',
    'action'
  ];

  dataSource = new MatTableDataSource(this.childProjectList);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['childProjectList']) {
      this.dataSource.data = this.childProjectList;
    }
  }
  // Sorting
  ngAfterViewInit() {
    this.dataSource.sort = this.sort; // Connect sort with table
    this.dataSource.paginator = this.paginator;
  }
  onProjectView(){
    this.router.navigate(['/project/view']);
  }
  onProjectEdit(){
    this.router.navigate(['/project/edit'])
  }
}
