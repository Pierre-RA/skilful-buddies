import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
