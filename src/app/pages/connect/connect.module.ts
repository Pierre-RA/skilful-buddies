import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ConnectComponent } from './connect.component';
import { routing } from './connect.routing';

import { HeaderModule } from '../../templates/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
  ],
  declarations: [ConnectComponent]
})
export class ConnectModule { }
