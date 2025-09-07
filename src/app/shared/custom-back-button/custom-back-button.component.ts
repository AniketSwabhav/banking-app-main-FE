import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-custom-back-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-back-button.component.html',
  styleUrls: ['./custom-back-button.component.css']
})
export class CustomBackButtonComponent implements OnInit {
  @Input() fallBackUrl: string = ""
  @Input() buttonClass = ""
  @Input() iconClass = ""
  showBackButton: boolean = true

  constructor(
    private navigationHistoryService: UtilityService,
  ) { }

  ngOnInit(): void {
    let navigationHistory: string[] = this.navigationHistoryService.getNavigationHistory()
    if (!navigationHistory || navigationHistory.length == 0) {
      this.showBackButton = false
      return
    }
    // Check if more than one url is present
    let isMoreThanOneUrl = false
    const firstUrlWithoutQp = navigationHistory[0].split('?')[0];
    for (let i = navigationHistory.length - 1; i >= 0; i--) {
      const urlWithoutQp = navigationHistory[i].split('?')[0];
      if (urlWithoutQp !== firstUrlWithoutQp) {
        isMoreThanOneUrl = true
        break;
      }
    }
    if (!isMoreThanOneUrl) {
      this.showBackButton = false
      return
    }
  }

  goBack() {
    this.navigationHistoryService.onBackClick()
  }

}