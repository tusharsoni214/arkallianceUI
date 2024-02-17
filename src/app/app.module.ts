import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypeOfTestComponent } from './type-of-test/type-of-test.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { TestCaseDetailComponent } from './test-case-file/test-case-file.component';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { TestCaseFunctionsComponent } from './test-case-functions/test-case-functions.component';
import { HotToastModule } from '@ngneat/hot-toast';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TypeOfTestComponent,
    TestCaseDetailComponent,
    TestCaseFunctionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressBarModule,
    HotToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
