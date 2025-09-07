import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {
  accountId: string = '';

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router
  ) {
    this.accountId = this.route.snapshot.paramMap.get('accountId') || '';
  }

  transferForm = new FormGroup({
     toAccountNo: new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d+$/),     
    Validators.minLength(12),
    Validators.maxLength(18)
  ]),
  amount: new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d+$/),     
    Validators.min(1)
  ])
  });

  getUserFormData() {
    if (this.transferForm.invalid || !this.accountId) {
      alert('Form is invalid or Account ID missing');
      return;
    }

    const data = this.transferForm.value;

    this.accountService.transfer(this.accountId, data).subscribe({
      next: () => {
        alert("Money transferred successfully!");
        this.router.navigate(['/user/view-all-accounts']);
      },
      error: (err) => {
        console.error('Transfer failed:', err);
        alert('Transfer failed');
      }
    });
  }

  goBack() {
    this.router.navigate(['/user/view-all-accounts']);
  }
}
