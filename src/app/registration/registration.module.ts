import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationComponent } from './registration/registration.component';

const ROUTES: Routes = [
  {
    title: 'Registration Page',
    path: '',
    component: RegistrationComponent,
  },
];

@NgModule({
  declarations: [RegistrationComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES), ReactiveFormsModule],
  providers: [ReactiveFormsModule],
})
export class RegistrationModule {}
