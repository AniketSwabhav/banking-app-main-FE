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

}
