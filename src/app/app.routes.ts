import { Routes } from '@angular/router';
import { CustomerComponent } from './src/components/customer/customer.component';
import { CustomerCopyComponent } from './src/components/customer-copy/customer-copy.component';

export const routes: Routes = [
    {path:'', component:CustomerComponent},
    {path:'copy', component: CustomerCopyComponent}
];
