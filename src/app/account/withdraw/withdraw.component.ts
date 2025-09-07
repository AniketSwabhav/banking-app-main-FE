import { Component } from '@angular/core';
import { CommonModule , Location} from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from 'src/app/service/account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent {
  accountId: string = '';

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router
  ) {
    this.accountId = this.route.snapshot.paramMap.get('accountId') || '';
  }

  addAmount = new FormGroup({
     amount: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/), 
        Validators.min(1)])         
  });

  getUserFormData() {
    const data = this.addAmount.value;

    if (!this.accountId) {
      alert('No account ID found');
      return;
    }

    this.accountService.withdraw(this.accountId, data).subscribe({
      next: () => {
        alert("Money withdrawn successfully!");
        this.router.navigate(['/user/view-all-accounts']);
      },
      error: (err) => {
        console.error('Withdraw failed:', err);
        alert('Withdraw failed');
      }
    });
  }

  goBack() {
    this.router.navigate(['/user/view-all-accounts']);
  }
}