import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, PaginationComponent],
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  private userService = inject(UserService);
  user: any = null;

  //Pagination
  limit: number = 5
  offset: number = 0
  currentPage: number = 0
  totalUserRecords: number = 0
  selectedButtonIndex: number | null = null;
  

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('No token found');
      return;
    }
    const decoded = this.decodeJwt(token);
    
    const userId = decoded?.UserID || decoded?.id;
    if (!userId) {
      console.warn('User ID not found in token');
      return;
    }

    this.userService.viewUser(userId).subscribe({
      next: (res) => this.user = res,
      error: (err) => console.error('Failed to fetch user:', err)
    });
  }


  private decodeJwt(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }
}
