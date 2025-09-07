import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private URL = 'http://localhost:8001/api/v1/banking-app/account';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`
    });
  }

  viewAllAccountsOfUser(params?: HttpParams): Observable<any> {
    return this.http.get<any[]>(`${this.URL}/`,
      { headers: this.getAuthHeaders(), params: params, observe: "response" });
  }

  createAccount(bankId: string): Observable<any> {
    const url = `${this.URL}/bank/${bankId}`;
    const headers = this.getAuthHeaders();
    return this.http.post<any>(url, {}, { headers });
  }

  viewAccount(id: string) {
    const url = `${this.URL}/${id}`;
    const headers = this.getAuthHeaders();
    return this.http.get<any>(url, { headers });
  }

  updateAccount(id: string, data: any): Observable<any> {
    const url = `${this.URL}/${id}`;
    const headers = this.getAuthHeaders();
    return this.http.put<any>(url, data, { headers });
  }

  deleteAccount(accountId: string): Observable<any> {
    const url = `${this.URL}/${accountId}`;
    return this.http.delete<any>(url, { headers: this.getAuthHeaders() });
  }

  reactivateAccount(accountId: string): Observable<any> {
    const url = `${this.URL}/${accountId}/reactivate`;
    return this.http.put<any>(url, {}, { headers: this.getAuthHeaders() });
  }

  withdraw(accountId: string, data: any): Observable<any> {
    const url = `${this.URL}/${accountId}/withdraw`;
    const headers = this.getAuthHeaders();
    return this.http.post<any>(url, data, { headers });
  }

  deposite(accountId: string, data: any): Observable<any> {
    const url = `${this.URL}/${accountId}/deposite`;
    const headers = this.getAuthHeaders();
    return this.http.post<any>(url, data, { headers });
  }

  transfer(accountId: string, data: any): Observable<any> {
    const url = `${this.URL}/${accountId}/transfer`;
    const headers = this.getAuthHeaders();
    return this.http.post<any>(url, data, { headers });
  }

}
