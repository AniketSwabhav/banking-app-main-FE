
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from 'src/app/service/account.service';
import { BankService } from 'src/app/service/bank.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-view-all-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './view-all-accounts.component.html',
  styleUrls: ['./view-all-accounts.component.css']
})
export class ViewAllAccountsComponent implements OnInit {

  private accountService = inject(AccountService);
  private bankService = inject(BankService);
  private router = inject(Router);

  accounts: any[] = [];
  banks: any[] = [];

  selectedBankId: string = '';
  loading = true;
  error: string | null = null;

  // Pagination
  limit: number = 5;
  offset: number = 0;
  totalAccountRecords: number = 0;
  currentPage: number = 0;
  selectedButtonIndex: number | null = null;


  ngOnInit(): void {
    this.loadAccounts();
    this.loadBanks();
  }

  loadAccounts(): void {
    this.loading = true;

    const params = new HttpParams()
      .set('limit', this.limit.toString())
      .set('offset', this.offset.toString());

    let queryPramas: any = {
      limit: this.limit,
      offset: this.offset
    }
    this.router.navigate([], {
      queryParams: queryPramas,
    });

    this.accountService.viewAllAccountsOfUser(params).subscribe({
      next: (res) => {
        this.accounts = res.body || [];
        this.totalAccountRecords = parseInt(res.headers.get('X-Total-Count') || '0');
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading accounts:', err);
        this.error = 'Failed to load accounts';
        this.loading = false;
      }
    });
  }


  loadBanks(): void {
    this.bankService.viewAllBanks().subscribe({
      next: (res) => {
        this.banks = res.body || [];
      },
      error: (err) => {
        console.error('Error loading banks:', err);
        this.error = 'Failed to load banks';
      }
    });
  }

  addAccount(): void {
    if (!this.selectedBankId) return;

    this.accountService.createAccount(this.selectedBankId).subscribe({
      next: (res) => {
        alert('Account created successfully!');
        this.loadAccounts();
      },
      error: (err) => {
        console.error('Error creating account:', err);
        alert('Failed to create account.');
      }
    });
  }

  goToPassbook(accountId: string): void {
    this.router.navigate([`/user/account/passbook/${accountId}`]);
  }

  changePage(pageNumber: number): void {
    console.log(pageNumber);

    this.currentPage = pageNumber - 1;
    this.offset = (pageNumber - 1);
    console.log(pageNumber, this.offset);
    this.loadAccounts();
  }

  goToDeposit(): void {
    this.router.navigate(['/user/account/deposite']);
  }

  goToWithdraw(): void {
    this.router.navigate(['/user/account/withdraw']);
  }

}
