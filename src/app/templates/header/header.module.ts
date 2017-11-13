import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header.component';
import { NotificationModule } from '../notification/notification.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    NotificationModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule { }
