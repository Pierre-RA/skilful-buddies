import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SearchComponent } from './search.component';
import { routing } from './search.routing';

import { SearchService } from '../../shared/search.service';

import { HeaderModule } from '../../templates/header/header.module';
import { CardResultModule } from '../../templates/card-result/card-result.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
    CardResultModule
  ],
  declarations: [SearchComponent],
  providers: [SearchService]
})
export class SearchModule { }
