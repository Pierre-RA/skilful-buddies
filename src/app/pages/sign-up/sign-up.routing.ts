import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './sign-up.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: SignUpComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
