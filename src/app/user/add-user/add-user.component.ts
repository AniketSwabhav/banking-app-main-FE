import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/service/user.service';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  constructor(
    private userData: UserService,
    private router: Router
  ) { }

  addUser = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNo: new FormControl(''),
    Email: new FormControl(''),
    passWord: new FormControl(''),
  });

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getUserFormData() {
    const rawData = this.addUser.value;

    const formattedRequest = {
      firstName: rawData.firstName,
      lastName: rawData.lastName,
      phoneNo: rawData.phoneNo,
      credential: {
        email: rawData.Email,
        password: rawData.passWord
      }
    };

    this.userData.saveUser(formattedRequest).subscribe(
      response => {
        console.log('POST request successful:', response);
        alert("User registered successfully");
        this.router.navigate(['/admin/dashboard']);
      },
      error => {
        console.error('POST request error:', error);
      }
    );
  }

  onSubmit() {
    alert("User registered successfully");
  }


}
