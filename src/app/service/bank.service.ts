import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private URL = 'http://localhost:8001/api/v1/banking-app/bank';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`
    });
  }

  saveBank(data: any): Observable<any> {
    const url = `${this.URL}/register-bank`;
    const headers = this.getAuthHeaders();
    return this.http.post<any>(url, data, { headers });
  }

  viewAllBanks(params?: HttpParams): Observable<any> {
    return this.http.get<any[]>(`${this.URL}/`,
      { headers: this.getAuthHeaders(), params: params, observe: "response" });
  }

  viewBank(id: string) {
    const url = `${this.URL}/` + id;
    const headers = this.getAuthHeaders();
    return this.http.get<any>(url, { headers });
  }

  updateBank(id: string, data: any): Observable<any> {
    const url = `${this.URL}/${id}`;
    const headers = this.getAuthHeaders();
    return this.http.put<any>(url, data, { headers });
  }

  deleteBank(id: string): Observable<any> {
    const url = `${this.URL}/${id}`;
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(url, { headers: headers });
  }
}
