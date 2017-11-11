import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuardService } from './shared/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/pages/landing/landing.module#LandingModule'
  },
  {
    path: 'search',
    loadChildren: 'app/pages/search/search.module#SearchModule',
    pathMatch: 'full',
    canActivate: [ AuthGuardService ],
  },
  {
    path: 'connect',
    loadChildren: 'app/pages/connect/connect.module#ConnectModule',
    pathMatch: 'full',
    canActivate: [ AuthGuardService ],
  },
  {
    path: 'trade',
    loadChildren: 'app/pages/trade/trade.module#TradeModule',
    pathMatch: 'full',
    canActivate: [ AuthGuardService ],
  },
  {
    path: 'sign-up',
    loadChildren: 'app/pages/sign-up/sign-up.module#SignUpModule',
    pathMatch: 'full',
    data: {value: 'sign-up'}
  },
  {
    path: 'sign-in',
    loadChildren: 'app/pages/sign-up/sign-up.module#SignUpModule',
    pathMatch: 'full',
    data: {value: 'sign-in'}
  },
  {
    path: 'landing',
    loadChildren: 'app/pages/landing/landing.module#LandingModule',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
