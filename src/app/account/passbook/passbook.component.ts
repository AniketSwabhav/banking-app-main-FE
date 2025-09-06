import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PassbookService } from 'src/app/service/passbook.service';
import { PaginatePipe } from 'ngx-pagination';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-passbook',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './passbook.component.html',
  styleUrls: ['./passbook.component.css']
})
export class PassbookComponent implements OnInit {

  passbookEntries: any[] = [];
  accountId: string = '';

  // Pagination
  limit: number = 5;
  offset: number = 0;
  totalPassbookRecords: number = 0;
  currentPage: number = 0;
  selectedButtonIndex: number | null = null;


  constructor(
    private route: ActivatedRoute,
    private passbookservice: PassbookService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.loadPassbooks();
  }

  loadPassbooks(): void {
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
    
    this.accountId = this.route.snapshot.paramMap.get('accountId') || '';
    if (this.accountId) {
      this.passbookservice.viewPassBook(this.accountId).subscribe({
        next: (data: any) => {
          this.passbookEntries = data.body || [];
          this.totalPassbookRecords = parseInt(data.headers.get("X-Total-Count"));
        },
        error: (err) => {
          console.error('Error fetching passbook:', err);
          alert('Failed to load passbook details.');
          this.router.navigate(['user/view-all-accounts']);
        }
      });
    }

  }

  goBack() {
    this.location.back();
  }

  changePage(pageNumber: number): void {
    console.log(pageNumber);

    this.currentPage = pageNumber - 1;
    this.offset = (pageNumber - 1);
    console.log(pageNumber, this.offset);
    this.loadPassbooks();
  }

}