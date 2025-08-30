import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComponent } from './customer.component';
import { CustomerService } from '../../services/customer.service';
import { of } from 'rxjs';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;
  let customerService : jasmine.SpyObj<CustomerService>

  const el = (selector: string) =>
    fixture.nativeElement.querySelector(selector);

  beforeEach(async () => {
    customerService = jasmine.createSpyObj('CustomerService',['updateFirstName']);
    customerService.updateFirstName.and.returnValue(of({}));
    await TestBed.configureTestingModule({
      imports: [CustomerComponent],
      providers:[{provide: CustomerService, useValue: customerService}]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if id field is present', () => {
    expect(el('[data-test="id"]')).toBeTruthy();
  });

  it('should check if first name field is present', () => {
    expect(el('[data-test="firstName"]')).toBeTruthy();
  });

  it('should check if update button is present', () => {
    expect(el('[data-test="update-btn"]')).toBeTruthy();
  });

  it('should disable update button initially', () => {
    const button = el('button[type="submit"]');
    expect(button.disabled).toBeTrue();
  });

  it('should show required error for invalid id', () => {
    if (component.id) {
      // component.id.setValue('abc');
      component.id.markAsTouched();
    }
    fixture.detectChanges();
    
    expect(fixture.nativeElement.textContent).toContain('field required');
  });

  it('should show required error for invalid firstName', () => {
    if (component.firstName) {
      // component.firstName.setValue('!@#');
      component.firstName.markAsTouched();
    }
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('field required');
  });

  it('should show pattern error for invalid id', () => {
    if (component.id) {
      component.id.setValue('abc');
      component.id.markAsTouched();
    }
    fixture.detectChanges();
    
    expect(fixture.nativeElement.textContent).toContain('numbers only');
  });

  it('should show pattern error for invalid firstName', () => {
    if (component.firstName) {
      component.firstName.setValue('!@#');
      component.firstName.markAsTouched();
    }
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Only alphanumeric values');
  });

  it('should enable update button when fields are valid', () => {
    if (component.firstName && component.id) {
      component.firstName.setValue('Pawan');
      component.id.setValue('123');
      component.firstName.markAsTouched();
      component.id.markAsTouched();
    }
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeFalse();
  });

  it('should display confirmation on successful update', () => {
    if (component.firstName && component.id) {
      component.firstName.setValue('Pawan');
      component.id.setValue('123');
      component.firstName.markAsTouched();
      component.id.markAsTouched();
    }
    fixture.detectChanges();
    component.onSubmit();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('First Name updated successfully');
  });

});
