import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ChatComponent } from './chat.component';

export const routes: Routes = [
  {
    path: '',
    component: ChatComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
