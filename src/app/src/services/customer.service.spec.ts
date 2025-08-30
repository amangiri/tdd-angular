import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['put']);
    service = new CustomerService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call PUT /customers/:id with firstName', () => {
    const id = '123';
    const body = { firstName: 'Pawan' };
    const mockResponse = { success: true };

    httpClientSpy.put.and.returnValue(of(mockResponse));

    service.updateFirstName(id, body).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpClientSpy.put.calls.count()).toBe(1);
    expect(httpClientSpy.put.calls.mostRecent().args[0]).toBe(`/customers/${id}`);
    expect(httpClientSpy.put.calls.mostRecent().args[1]).toEqual(body);
  });
});
