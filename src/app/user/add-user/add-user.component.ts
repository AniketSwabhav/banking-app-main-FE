import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/service/user.service';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  firstName: new FormControl('', [Validators.required,Validators.maxLength(50)]),
  lastName: new FormControl('', [Validators.required,Validators.maxLength(50)]),
  phoneNo: new FormControl('', [ Validators.required,Validators.pattern(/^[1-9]\d{9}$/)]),
  Email: new FormControl('', [Validators.required,Validators.email]),
  passWord: new FormControl('', [Validators.required,Validators.minLength(8)])});

  showPassword: boolean = false;

  onPhoneInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10);
  this.addUser.get('phoneNo')?.setValue(input.value);
}

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
        this.router.navigate(['/admin/view-all-users']);
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
