import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityLogModule } from './security-log/security-log.module';
import { SecurityComponent } from './security.component';


@NgModule({
  declarations: [
    SecurityComponent
  ],
  imports: [
    CommonModule,
    SecurityLogModule
  ]
})
export class SecurityModule { }
