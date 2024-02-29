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
import { ChatComponent } from './chat/chat.component';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { CodeBlockPipe } from './code-block.pipe';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddTestComponent } from './add-test/add-test.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TypeOfTestComponent,
    TestCaseDetailComponent,
    TestCaseFunctionsComponent,
    ChatComponent,
    CodeBlockPipe,
    CodeEditorComponent,
    AddTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressBarModule,
    HotToastModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
