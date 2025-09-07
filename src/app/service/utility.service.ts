import { Injectable } from '@angular/core';
import { Location } from "@angular/common";
import { SessionStorageService } from './session-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  readonly NAVIGATION_HISTORY = "navigation-history"

  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private location: Location
  ) { }


  //===========================================================================
  getPaginationString(limit: number, offset: number, totalCount: number): string {
    if (limit == -1) {
      limit = totalCount
    }

    let start: number = limit * offset + 1
    let end: number = +limit + limit * offset

    if (totalCount < end) {
      end = totalCount
    }
    if (totalCount == 0) {
      return ""
    }

    if (start > end) {
      return `${end} - ${end}`
    }

    return `${start} - ${end}`
  }

  //===========================================================================

  public addUrlToNavigationHistory(url: string) {
    if (!url) {
      console.warn("Trying to push empty url in history.")
    }

    let navigationHistory: string[] = this.sessionStorageService.getJsonValue(this.NAVIGATION_HISTORY) || []

    navigationHistory.push(url);

    // If the history exceeds 50 URLs, remove the first 30
    if (navigationHistory.length > 50) {
      navigationHistory.splice(0, 30);
    }
    this.sessionStorageService.setJsonValue(this.NAVIGATION_HISTORY, navigationHistory)
  }

  public getNavigationHistory(): string[] {
    return this.sessionStorageService.getJsonValue(this.NAVIGATION_HISTORY)
  }

  public clearNavigationHistory() {
    this.sessionStorageService.setJsonValue(this.NAVIGATION_HISTORY, null)
  }

  // key should be the component name from where the redirect is happening.
  public setUrlFrom(key: string, url: string) {
    this.sessionStorageService.setJsonValue(key, url)
  }

  getUrlFrom(key: string): string {
    return this.sessionStorageService.getJsonValue(key)
  }

  public onBackClick(currentUrlWithoutQp?: string) {
    let navigationHistory: string[] = this.getNavigationHistory()
    if (!navigationHistory || navigationHistory.length == 0) {
      this.location.back()
      return
    }

    // Find the first URL that doesn't match the current URL, ignoring query params
    currentUrlWithoutQp = this.router.url.split('?')[0];
    let backNavigationUrl: string = "";
    let backNavigationIndex: number = -1;

    for (let i = navigationHistory.length - 1; i >= 0; i--) {
      const urlWithoutQp = navigationHistory[i].split('?')[0];
      if (urlWithoutQp !== currentUrlWithoutQp) {
        backNavigationUrl = navigationHistory[i];
        backNavigationIndex = i;
        break;
      }
    }
    if (!backNavigationUrl) {
      this.location.back();
      return
    }
  }
}
