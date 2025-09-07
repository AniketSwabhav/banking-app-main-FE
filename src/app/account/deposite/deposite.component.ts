import { Component } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-deposite',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './deposite.component.html',
  styleUrls: ['./deposite.component.css']
})
export class DepositeComponent {
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
    Validators.min(1)           
  ])
  });

  getUserFormData() {
    const data = this.addAmount.value;

    if (!this.accountId) {
      alert('No account ID found');
      return;
    }

    this.accountService.deposite(this.accountId, data).subscribe({
      next: () => {
        alert("Money Deposited successfully!");
        this.router.navigate(['/user/view-all-accounts']);
      },
      error: (err) => {
        console.error('Deposite failed:', err);
        alert('Deposite failed');
      }
    });
  }

  goBack() {
    this.router.navigate(['/user/view-all-accounts']);
  }
}
