import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  userId: string = '';
  user: any;

  // accountData: any = [];
  // selectedButtonIndex: number | null = null;
  // limit: number = 5
  // offset: number = 0
  // currentPage: number = 0;
  // accountCount: number = 0;
  // totalAccountRecords: number = 0;


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    if (this.userId) {
      this.userService.viewUser(this.userId).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (err) => {
          console.error('Error fetching user:', err);
          alert('Failed to load user details.');
          this.router.navigate(['/admin/view-all-users']);
        }
      });
    }
  }

  //   changePage(pageNumber: number): void {
  //   console.log(pageNumber);

  //   this.currentPage = pageNumber - 1;
  //   this.offset = (pageNumber - 1);
  //   console.log(pageNumber, this.offset);
  //   this.loadAccounts();
  // }

  goBack() {
    this.location.back();
  }
}
