import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankService } from '../service/bank.service';
import { PaginationComponent } from '../shared/pagination/pagination.component';

@Component({
  selector: 'app-settlement',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.css']
})
export class SettlementComponent implements OnInit {

  settlements: any[] = [];
  totalRecords: number = 0;

  // Pagination
  limit: number = 5;
  offset: number = 0;
  totalAccountRecords: number = 0;
  currentPage: number = 0;
  selectedButtonIndex: number | null = null;


  constructor(private bankService: BankService) {}

  ngOnInit(): void {
    this.fetchSettlements();
  }

  fetchSettlements() {
    this.bankService.getSettlementRecords().subscribe({
      next: (res) => {
        this.settlements = res.body;
        this.totalRecords = parseInt(res.headers.get('X-Total-Count') || '0');
      },
      error: (err) => {
        console.error('Failed to fetch settlements', err);
        alert('Failed to load settlement data.');
      }
    });
  }

  changePage(pageNumber: number): void {
    console.log(pageNumber);
    this.currentPage = pageNumber - 1;
    this.offset = (pageNumber - 1);
    console.log(pageNumber, this.offset);
    this.fetchSettlements();
  }
}
