import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BankService } from 'src/app/service/bank.service';

@Component({
  selector: 'app-view-bank',
  templateUrl: './view-bank.component.html',
  styleUrls: ['./view-bank.component.css']
})
export class ViewBankComponent implements OnInit {
  bankId: string = '';
  bank : any;

  constructor(
    private route: ActivatedRoute,
    private bankService: BankService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.bankId = this.route.snapshot.paramMap.get('id') || '';
    if (this.bankId) {
      this.bankService.viewBank(this.bankId).subscribe({
        next: (data) => {
          this.bank = data;
        },
        error: (err) => {
          console.error('Error fetching bank:', err);
          alert('Failed to load bank details.');
          this.router.navigate(['/admin/view-all-banks']);
        }
      });
    }
  }

  //   changePage(pageNumber: number): void {
  //   console.log(pageNumber);

  //   this.currentPage = pageNumber - 1;
  //   this.offset = (pageNumber - 1);
  //   console.log(pageNumber, this.offset);
  //   this.loadAccounts();
  // }

  goBack() {
    this.location.back();
  }
}
