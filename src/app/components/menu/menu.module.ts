import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { MenuDefaultComponent } from './menu-default/menu-default.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialPrincipalModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    MenuDefaultComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialPrincipalModule,
  ],
  providers: [
  ],
  bootstrap: [MenuDefaultComponent]
})
export class MenuModule { }

