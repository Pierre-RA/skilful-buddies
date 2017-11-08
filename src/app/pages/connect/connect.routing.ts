import { Routes, RouterModule } from '@angular/router';

import { ConnectComponent } from './connect.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ConnectComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
