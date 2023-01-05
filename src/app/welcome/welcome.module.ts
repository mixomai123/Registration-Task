import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { RouterModule, Routes } from '@angular/router';

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
