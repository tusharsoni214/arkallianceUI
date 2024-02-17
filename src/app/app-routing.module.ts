import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { TypeOfTestComponent } from './type-of-test/type-of-test.component';

const routes: Routes = [
  { path: 'chat', component: ChatComponent }, 
  { path: '', component: TypeOfTestComponent } 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
