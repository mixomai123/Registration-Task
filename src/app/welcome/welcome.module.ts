import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome.component';

const ROUTES: Routes = [
  {
    title: 'Welcome!',
    path: '',
    component: WelcomeComponent,
  },
];

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
})
export class WelcomeModule {}
