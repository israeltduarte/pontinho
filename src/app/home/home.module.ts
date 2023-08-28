import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared';
import { HomeComponent } from './pages';

@NgModule({
  imports: [SharedModule, ReactiveFormsModule],
  providers: [],
  declarations: [HomeComponent],
})
export class HomeModule {}
