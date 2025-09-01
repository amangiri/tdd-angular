import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCopyComponent } from './customer-copy.component';
import { CustomerService } from '../../services/customer.service';
import { of } from 'rxjs';

describe('CustomerCopyComponent', () => {
  let component: CustomerCopyComponent;
  let fixture: ComponentFixture<CustomerCopyComponent>;
  let customerService: jasmine.SpyObj<CustomerService>;

  beforeEach(async () => {
    customerService = jasmine.createSpyObj('CustomerService', [
      'updateFirstName',
    ]);
    customerService.updateFirstName.and.returnValue(of({}));
    await TestBed.configureTestingModule({
      imports: [CustomerCopyComponent],
      providers:[{provide: CustomerService, useValue: customerService}]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if id field is present', () => {
    expect(
      fixture.nativeElement.querySelector('[data-test="id"]')
    ).toBeTruthy();
  });

  it('should check if firstname field is present', () => {
    expect(
      fixture.nativeElement.querySelector('[data-test="firstName"]')
    ).toBeTruthy();
  });

  it('should check if update button is present', () => {
    expect(
      fixture.nativeElement.querySelector('[data-test="update-btn"]')
    ).toBeTruthy();
  });

  it('should disable button initially', () => {
    expect(
      fixture.nativeElement.querySelector('button[type="submit"]').disabled
    ).toBeTrue();
  });

  it('should check number error field is present', () => {
    component.id?.markAsTouched();
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('[data-test="number-error"]')
    ).toBeTruthy();
  });

  it('should check firstName error field is present', () => {
    component.firstName?.markAsTouched();
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('[data-test="firstName-error"]')
    ).toBeTruthy();
  });

  it('should show required error if id is touched and empty', () => {
    component.id?.markAsTouched();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('field required');
  });

  it('should show error if id field is invalid', () => {
    component.id?.setValue('abc');
    component.id?.markAsTouched();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('numbers only');
  });

  it('should show required error if firstName is touched and empty', () => {
    component.firstName?.markAsTouched();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('field required');
  });

  it('should show error if firstname field is invalid', () => {
    component.firstName?.setValue('@323');
    component.firstName?.markAsTouched();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      'Only alphanumeric values'
    );
  });

  it('should enable update button when fields are valid', () => {
    component.id?.setValue('1');
    component.firstName?.setValue('Aman');
    component.id?.markAsTouched();
    component.firstName?.markAsTouched();
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('button[type="submit"]').disabled
    ).toBeFalse();
  });

  it('should show success message on successfull form update', () => {
    component.id?.setValue('1');
    component.firstName?.setValue('Aman');
    component.id?.markAsTouched();
    component.firstName?.markAsTouched();
    component.updateUser();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(
      'First Name updated successfully.'
    );
  });
});
