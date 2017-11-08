import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', loadChildren: 'app/pages/search/search.module#SearchModule'},
  { path: 'search', loadChildren: 'app/pages/search/search.module#SearchModule', pathMatch: 'full' },
  { path: 'connect', loadChildren: 'app/pages/connect/connect.module#ConnectModule', pathMatch: 'full' },
  { path: 'trade', loadChildren: 'app/pages/trade/trade.module#TradeModule', pathMatch: 'full' },
  { path: 'sign-up', loadChildren: 'app/pages/sign-up/sign-up.module#SignUpModule', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
