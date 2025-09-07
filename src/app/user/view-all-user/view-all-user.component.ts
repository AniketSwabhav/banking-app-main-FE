import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { HttpParams } from '@angular/common/http';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';

@Component({
  selector: 'app-view-all-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, PaginationComponent, FormsModule],
  templateUrl: './view-all-user.component.html',
  styleUrls: ['./view-all-user.component.css']
})
export class ViewAllUserComponent implements OnInit {

  userData: any = [];
  filteredusers: any[] = [];
  userCount: number = 0;


  //Pagination
  limit: number = 5
  offset: number = 0
  currentPage: number = 0
  totalUserRecords: number = 0
  selectedButtonIndex: number | null = null;

  searchTerm: string = '';

  constructor(
    private router: Router,
    private usersData: UserService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
   this.activatedRoute.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.offset = parseInt(params['offset'] || '0');
      this.limit = parseInt(params['limit'] || '5');

      this.loadUsers();
    });
  }

  loadUsers() {
   const params = new HttpParams()
      .set('limit', this.limit.toString())
      .set('offset', this.offset.toString());
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        limit: this.limit,
        offset: this.offset,
        search: this.searchTerm || null,
      },
      queryParamsHandling: 'merge',
    });

    this.usersData.viewAllUsers(params).subscribe({
      next: (data: any) => {
        console.log("Data from viewAllUsers: ", data);
        this.userData = data.body;
        this.totalUserRecords = parseInt(data.headers.get("X-Total-Count"));
        console.log("User Data=======>>>>>>", this.userData);
        console.log("Total User Records: ", this.totalUserRecords);
        this.applySearchFilter();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  onUpdateClick(userID: string) {
    this.router.navigate(['admin/user', userID, 'update']);
  }

  onDisableClick(userID: string) {
    this.usersData.viewUser(userID).subscribe(user => {
      user.isActive = false;

      if (!user.firstName || !user.lastName || !user.phoneNo) {
        alert("Missing required user data");
        return;
      }

      this.usersData.updateUser(userID, user).subscribe(() => {
        alert(`User ${userID} has been disabled.`);
        const localUser = this.userData.find((u: any) => u.id === userID);
        if (localUser) localUser.isActive = false;
      });
    });
  }

  onReviveClick(userID: string) {
    this.usersData.viewUser(userID).subscribe(user => {
      user.isActive = true; // Set isActive to true to revive user
      this.usersData.updateUser(userID, user).subscribe(() => {
        alert(`User ${userID} has been revived.`);
        const localUser = this.userData.find((u: any) => u.id === userID);
        if (localUser) localUser.isActive = true;
      });
    });
  }

  onDeleteClick(userID: string) {
    const confirmed = window.confirm("Are you sure you want to delete this user?");

    if (confirmed) {
      this.usersData.deleteUser(userID).subscribe(() => {
        alert(`User ${userID} has been deleted.`);
        this.loadUsers();
      });
    } else {
      console.log("User deletion canceled.");
    }
  }



  changePage(pageNumber: number): void {
    console.log(pageNumber);

    this.currentPage = pageNumber - 1;
    this.offset = (pageNumber - 1);
    console.log(pageNumber, this.offset);
    this.loadUsers();
  }

  applySearchFilter(): void {
  const term = this.searchTerm.toLowerCase();
  this.filteredusers = this.userData.filter((user: any) =>
    user.credential.email.toLowerCase().includes(term)
  );
}



  resetSearch(): void {
    this.searchTerm = '';
    this.offset = 0;
    this.currentPage = 0;
    this.updateQueryParams();
    this.applySearchFilter();
  }

  updateQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        search: this.searchTerm || null,
        offset: this.offset,
        limit: this.limit
      },
      queryParamsHandling: 'merge',
    });

    this.offset = 0;
    this.currentPage = 0;
    this.applySearchFilter();
  }



}
