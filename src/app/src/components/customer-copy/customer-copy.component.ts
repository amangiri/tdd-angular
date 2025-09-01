import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-copy',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './customer-copy.component.html',
  styleUrl: './customer-copy.component.scss',
})
export class CustomerCopyComponent {
  confirmation: boolean = false;
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {}
  userForm = this.fb.group({
    id: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    firstName: [
      '',
      [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')],
    ],
  });

  get firstName() {
    return this.userForm.get('firstName');
  }
  get id() {
    return this.userForm.get('id');
  }

  updateUser() {
    this.submitted = true;
    if (this.userForm.valid) {
      const id = this.id?.value ?? ''; // safe fallback to empty string
      const firstName = this.firstName?.value ?? '';
      this.customerService
        .updateFirstName(id, { firstName: firstName })
        .subscribe(() => {
          this.confirmation = true;
        });
    }
  }
}
