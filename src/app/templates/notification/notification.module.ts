import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './notification.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NotificationComponent],
  exports: [NotificationComponent]
})
export class NotificationModule { }
