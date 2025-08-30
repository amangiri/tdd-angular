import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  updateFirstName(id: string, body: { firstName: string }) : Observable<any>{
    return this.http.put<any>(`/customers/${id}`, body);
  }
}
