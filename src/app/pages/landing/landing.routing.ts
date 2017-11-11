import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
