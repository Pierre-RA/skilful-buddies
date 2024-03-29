import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FacebookModule } from 'ngx-facebook';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { MarkdownModule } from 'angular2-markdown';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { ErrorModule } from './pages/error/error.module';

import { environment } from '../environments/environment';
import { AuthGuardService } from './shared/auth-guard.service';
import { AuthService } from './shared/auth.service';
import { UsersService } from './shared/users.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FacebookModule.forRoot(),
    Ng2PageScrollModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.mapsAPI
    }),
    MarkdownModule.forRoot(),
    AgmSnazzyInfoWindowModule,
    InlineEditorModule,
    HttpClientModule,
    FormsModule,
    routing,
    ErrorModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
