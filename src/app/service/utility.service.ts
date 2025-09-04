import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

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
}
