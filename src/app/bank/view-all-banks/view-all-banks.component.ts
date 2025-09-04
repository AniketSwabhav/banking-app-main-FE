import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BankService } from 'src/app/service/bank.service';
import { HttpParams } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';

@Component({
  selector: 'app-view-all-banks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, PaginationComponent],
  templateUrl: './view-all-banks.component.html',
  styleUrls: ['./view-all-banks.component.css']
})
export class ViewAllBanksComponent {

  userData: any = [];
  userCount: number = 0;


  //  //Forms
  // searchForm!: FormGroup
  // searchFormValue: any = null
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
    this.loadBanks();
  }

  loadBanks() {
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

    this.banksData.viewAllBanks(params).subscribe({
      next: (data: any) => {
        console.log("Data from viewAllBanks: ", data);
        this.userData = data.body;
        this.totalBankRecords = parseInt(data.headers.get("X-Total-Count"));
        console.log("User Data=======>>>>>>", this.userData);
        console.log("Total Bank Records: ", this.totalBankRecords);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  onUpdateClick(userID: string) {
    console.log("from view, id: ", userID);
    this.router.navigate(['/bank/update', userID]);
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
        const localUser = this.userData.find((u: any) => u.id === bankID);
        if (localUser) localUser.isActive = false;
      });
    });
  }

  onReviveClick(bankID: string) {
    this.banksData.viewBank(bankID).subscribe(bank => {
      bank.isActive = true; 
      this.banksData.updateBank(bankID, bank).subscribe(() => {
        alert(`Bank ${bankID} has been revived.`);
        const localUser = this.userData.find((u: any) => u.id === bankID);
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
}
