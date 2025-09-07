import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BankService } from 'src/app/service/bank.service';

@Component({
  selector: 'app-update-bank',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update-bank.component.html',
  styleUrls: ['./update-bank.component.css']
})
export class UpdateBankComponent {

  bankIDtoUpdate: any;
    bank: any;
  
    constructor(
      private route: ActivatedRoute,
      private bankData: BankService,
      private router: Router,
    ) { }
  
    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        this.bankIDtoUpdate = params.get('bankId');
        console.log('Received ID:', this.bankIDtoUpdate);
        this.bankData.viewBank(this.bankIDtoUpdate).subscribe((data) => {
          this.bank = data;
          this.updateUser.patchValue({
            fullName: this.bank.fullName,
            isActive: this.bank.isActive,
          });
        });
      });
    }
  
    updateUser = new FormGroup({
      fullName: new FormControl(''),
      isActive: new FormControl(),
    });
  
    getUserFormData() {
      console.log(this.updateUser.value);
      if (this.bankIDtoUpdate)
        this.bankData.updateBank(this.bankIDtoUpdate, this.updateUser.value).subscribe((result) => {
          console.log(result);
          alert("Bank updated successfully");
          this.router.navigate(['/admin/view-all-banks']);
        })
    }

}
