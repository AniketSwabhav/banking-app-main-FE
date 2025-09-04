import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BankService } from 'src/app/service/bank.service';

@Component({
  selector: 'app-add-bank',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.css']
})
export class AddBankComponent {

  constructor(
      private bankData: BankService,
      private router: Router
    ) { }
  
    addBank = new FormGroup({
      fullName: new FormControl(''),
      // lastName: new FormControl(''),
      // phoneNo: new FormControl(''),
      // Email: new FormControl(''),
      // passWord: new FormControl(''),
    });
  
    // showPassword: boolean = false;
  
    // togglePasswordVisibility() {
    //   this.showPassword = !this.showPassword;
    // }
  
    getUserFormData() {
      const rawData = this.addBank.value;
  
      const formattedRequest = {
        fullName: rawData.fullName,
        // lastName: rawData.lastName,
        // phoneNo: rawData.phoneNo,
        // credential: {
        //   email: rawData.Email,
        //   password: rawData.passWord
        // }
      };
  
      this.bankData.saveBank(formattedRequest).subscribe(
        response => {
          console.log('POST request successful:', response);
          alert("Bank registered successfully");
          this.router.navigate(['/admin/view-all-banks']);
        },
        error => {
          console.error('POST request error:', error);
        }
      );
    }
  
    onSubmit() {
      alert("Bank registered successfully");
    }
  
  
}
