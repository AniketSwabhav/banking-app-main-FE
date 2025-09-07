import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
       fullName: new FormControl('', [Validators.required,Validators.maxLength(50),Validators.pattern(/^[a-zA-Z ]+$/)])
      });
  
    getUserFormData() {
      const rawData = this.addBank.value;
  
      const formattedRequest = {
        fullName: rawData.fullName,
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
