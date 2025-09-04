import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../service/login.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isAuthenticated = false;
  isAdmin = false;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.isAuthenticated = this.loginService.isAuthenticated();
    this.isAdmin = this.loginService.isAdmin();
  }
  
  logout() {
    this.loginService.logout();
    this.isAuthenticated = false;
    this.isAdmin = false;
  }

}
