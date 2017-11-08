import { Routes, RouterModule } from '@angular/router';

import { TradeComponent } from './trade.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: TradeComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
