import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AttachmentsComponent } from './attachment/attachments.component';
import { GlobalErrorHandlerService } from './global-error-handler.service';

@NgModule({
  declarations: [AppComponent, AttachmentsComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, NgbModule],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandlerService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
