import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  // Set the json data to session storage
  setJsonValue(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value))
  }

  // Get the json value from session storage
  getJsonValue(key: string): any {
    const value = sessionStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
    return ""
  }
}
