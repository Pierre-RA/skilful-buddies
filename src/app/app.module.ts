import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FacebookModule } from 'ngx-facebook';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AuthGuardService } from './shared/auth-guard.service';
import { AuthService } from './shared/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FacebookModule.forRoot(),
    routing
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
