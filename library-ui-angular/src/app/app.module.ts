import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { CatalogComponent } from './catalog/catalog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    CatalogComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
