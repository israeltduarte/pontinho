import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigsModalModule } from './components/configs-modal/configs-modal.module';
import { WinnerModalModule } from './components/winner-modal/winnder-modal.module';
import { SharedModule } from './shared';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
    CommonModule,
    WinnerModalModule,
    ConfigsModalModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
