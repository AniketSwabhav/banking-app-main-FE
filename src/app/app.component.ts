import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginService } from './service/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Banking Application';

  isAuthenticated: boolean = false;
  private subscription!: Subscription;  

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.subscription = this.loginService.authStatus$.subscribe(
      (status) => {
        this.isAuthenticated = status;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // ngOnInit(): void {
  //   this.isAuthenticated = this.loginService.isAuthenticated();
  // }
}
