import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BankService } from 'src/app/service/bank.service';
import { HttpParams } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';

@Component({
  selector: 'app-view-all-banks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, PaginationComponent, FormsModule],
  templateUrl: './view-all-banks.component.html',
  styleUrls: ['./view-all-banks.component.css']
})
export class ViewAllBanksComponent implements OnInit {

  bankData: any = [];
  bankCount: number = 0;
  filteredBanks: any[] = [];
  searchTerm: string = '';
  selectedButtonIndex: number | null = null;

  //Pagination
  limit: number = 5
  offset: number = 0
  currentPage: number = 0
  totalBankRecords: number = 0

  constructor(
    private router: Router,
    private banksData: BankService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.offset = parseInt(params['offset'] || '0');
      this.limit = parseInt(params['limit'] || '5');

      this.loadBanks();
    });
  }

  loadBanks() {
    const params = new HttpParams()
      .set('limit', this.limit.toString())
      .set('offset', this.offset.toString());
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        limit: this.limit,
        offset: this.offset,
        search: this.searchTerm || null,
      },
      queryParamsHandling: 'merge',
    });

    this.banksData.viewAllBanks(params).subscribe({
      next: (data: any) => {
        console.log("Data from viewAllBanks: ", data);
        this.bankData = data.body;
        this.totalBankRecords = parseInt(data.headers.get("X-Total-Count"));
        console.log("User Data=======>>>>>>", this.bankData);
        console.log("Total Bank Records: ", this.totalBankRecords);
        this.applySearchFilter();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  onUpdateClick(bankID: string) {
    this.router.navigate(['admin/bank', bankID, 'update']);
  }

  onDisableClick(bankID: string) {
    this.banksData.viewBank(bankID).subscribe(bank => {
      bank.isActive = false;

      if (!bank.fullName) {
        alert("Missing required bank data");
        return;
      }

      this.banksData.updateBank(bankID, bank).subscribe(() => {
        alert(`bank ${bankID} has been disabled.`);
        const localUser = this.bankData.find((u: any) => u.id === bankID);
        if (localUser) localUser.isActive = false;
      });
    });
  }

  onReviveClick(bankID: string) {
    this.banksData.viewBank(bankID).subscribe(bank => {
      bank.isActive = true;
      this.banksData.updateBank(bankID, bank).subscribe(() => {
        alert(`Bank ${bankID} has been revived.`);
        const localUser = this.bankData.find((u: any) => u.id === bankID);
        if (localUser) localUser.isActive = true;
      });
    });
  }

  onDeleteClick(bankID: string) {
    const confirmed = window.confirm("Are you sure you want to delete this bank?");

    if (confirmed) {
      this.banksData.deleteBank(bankID).subscribe(() => {
        alert(`Bank ${bankID} has been deleted.`);
        this.loadBanks();
      });
    } else {
      console.log("Bank deletion canceled.");
    }
  }

  changePage(pageNumber: number): void {
    console.log(pageNumber);

    this.currentPage = pageNumber - 1;
    this.offset = (pageNumber - 1);
    console.log(pageNumber, this.offset);
    this.loadBanks();
  }

  applySearchFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredBanks = [...this.bankData]; // Show all if no search
      return;
    }

    this.filteredBanks = this.bankData.filter((bank: any) =>
      bank.fullName.toLowerCase().includes(term)
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
      relativeTo: this.activatedRoute,
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
