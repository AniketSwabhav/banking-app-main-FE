
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from 'src/app/service/account.service';
import { BankService } from 'src/app/service/bank.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  private route = inject(ActivatedRoute);

  accounts: any[] = [];
  filteredAccounts: any[] = [];
  banks: any[] = [];

  selectedBankId: string = '';
  searchTerm: string = '';
  loading = true;
  error: string | null = null;

  // Pagination
  limit: number = 5;
  offset: number = 0;
  totalAccountRecords: number = 0;
  currentPage: number = 0;
  selectedButtonIndex: number | null = null;


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.limit = +params['limit'] || 5;
      this.offset = +params['offset'] || 0;
      this.searchTerm = params['search'] || '';
      this.currentPage = this.offset + 1;

      this.loadAccounts();
      this.loadBanks();
    });
  }

  loadAccounts(): void {
    this.loading = true;

    const params = new HttpParams()
      .set('limit', this.limit.toString())
      .set('offset', this.offset.toString());
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        limit: this.limit,
        offset: this.offset,
        search: this.searchTerm || null,
      },
      queryParamsHandling: 'merge',
    });

    this.accountService.viewAllAccountsOfUser(params).subscribe({
      next: (res) => {
        this.accounts = res.body || [];
        this.totalAccountRecords = parseInt(res.headers.get('X-Total-Count') || '0');
        this.applySearchFilter();
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

  goToPassbook(accountID: string): void {
    this.router.navigate(['user/account', accountID, 'passbook']);
  }

  goToDeposit(accountID: string): void {
    this.router.navigate(['user/account', accountID, 'deposit']);
  }

  goToWithdraw(accountID: string): void {
    this.router.navigate(['user/account', accountID, 'withdraw']);
  }

  goToTransfer(accountID: string): void {
    this.router.navigate(['user/account', accountID, 'transfer']);
  }

  onDisableAccount(accountId: string) {
    this.accountService.viewAccount(accountId).subscribe((account) => {
      account.isActive = false;
      this.accountService.updateAccount(accountId, account).subscribe(() => {
        alert(`Account has been disabled.`);
        const localUser = this.accounts.find((a: any) => a.id === accountId);
        if (localUser) localUser.isActive = false;
      })
    });
  }

  onReviveAccount(accountId: string) {
    this.accountService.viewAccount(accountId).subscribe((account) => {
      account.isActive = true;
      this.accountService.updateAccount(accountId, account).subscribe(() => {
        alert(`Account has been Enabled.`);
        const localUser = this.accounts.find((a: any) => a.id === accountId);
        if (localUser) localUser.isActive = true;
      })
    });
  }

  onDeleteAccount(accountId: string) {
    const confirmed = confirm('Are you sure you want to delete this account?');
    if (confirmed) {
      this.accountService.deleteAccount(accountId).subscribe({
        next: () => {
          alert('Account deleted.');
          this.loadAccounts();
        },
        error: (err) => console.error('Delete failed:', err)
      });
    }
  }

  changePage(pageNumber: number): void {

    this.currentPage = pageNumber - 1;
    this.offset = (pageNumber - 1);

    this.loadAccounts();
  }

  applySearchFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredAccounts = this.accounts.filter(account =>
      account.accountNo.toLowerCase().includes(term)
    );
  }

  resetSearch(): void {
    this.searchTerm = '';
    this.offset = 0;
    this.currentPage = 0;
    this.updateQueryParams();
    this.applySearchFilter();
  }

  updateQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.searchTerm || null,
        offset: this.offset,
        limit: this.limit
      },
      queryParamsHandling: 'merge',
    });

    this.offset = 0;
    this.currentPage = 0;
    this.applySearchFilter();
  }

}
