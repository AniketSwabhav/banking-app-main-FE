import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassbookService {

  private URL = 'http://localhost:8001/api/v1/banking-app/passbook';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`
    });
  }

  viewPassBook(accountId: string, params?: HttpParams) {
    const url = `${this.URL}/${accountId}`;
    const headers = this.getAuthHeaders();
    return this.http.get<any>(url, {  headers: this.getAuthHeaders(), params: params, observe: 'response'});
  }
}
