import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admindashboard',
  standalone:true,
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
  imports: [CommonModule, HttpClientModule],
})
export class AdmindashboardComponent implements OnInit {

  private userService = inject(UserService);
  user: any = null;

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = this.decodeJwt(token);
      const userId = decoded?.UserID || decoded?.id;

      if (userId) {
        this.userService.viewUser(userId).subscribe({
          next: (res) => this.user = res,
          error: (err) => console.error('Failed to fetch user:', err)
        });
      } else {
        console.warn('User ID not found in token');
      }
    } else {
      console.warn('No token found');
    }
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
