import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  updateForm = this.fb.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]+$')
      ]
    ],
    id: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]
    ]
  });

  submitted = false;
  confirmation = false;

  constructor(private fb: FormBuilder, private customerService: CustomerService) {}

  get firstName() { return this.updateForm.get('firstName'); }
  get id() { return this.updateForm.get('id'); }

  onSubmit() {
    this.submitted = true;
    if (this.updateForm.valid) {
      const id = this.id?.value ?? '';  // safe fallback to empty string
      const firstName = this.firstName?.value ?? '';
      this.customerService.updateFirstName(id, { firstName: firstName })
        .subscribe(() => {
          this.confirmation = true;
        });
    }
  }
}