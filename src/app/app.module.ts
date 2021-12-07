import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeletedialogComponent } from './adminpanel/deletedialog/deletedialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdminpanelComponent,
    DeletedialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
