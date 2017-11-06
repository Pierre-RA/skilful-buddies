import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', loadChildren: 'app/pages/search/search.module#SearchModule'},
  // { path: 'game', loadChildren: 'app/pages/board/board.module#BoardModule', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
