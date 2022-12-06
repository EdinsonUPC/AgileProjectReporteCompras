import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityLogComponent } from './security-log.component';
import { SecurityLogInComponent } from './security-log-in/security-log-in.component';


@NgModule({
  declarations: [
    SecurityLogComponent,
    SecurityLogInComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SecurityLogModule { }
