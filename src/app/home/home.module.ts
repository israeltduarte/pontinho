import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared';
import { HomeComponent } from './pages';
import { WinnerModalModule } from '../components/winner-modal/winnder-modal.module';

@NgModule({
  imports: [SharedModule, ReactiveFormsModule, WinnerModalModule],
  providers: [],
  declarations: [HomeComponent],
})
export class HomeModule {}
