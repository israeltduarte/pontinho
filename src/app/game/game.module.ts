import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { WinnerModalModule } from '../components/winner-modal/winnder-modal.module';
import { SharedModule } from '../shared';
import { HomeComponent } from './pages';
import { MatchComponent } from './pages/match/match.component';
import { SettingsComponent } from './pages/settings/settings.component';

@NgModule({
  imports: [SharedModule, ReactiveFormsModule, WinnerModalModule],
  providers: [],
  declarations: [HomeComponent, MatchComponent, SettingsComponent],
})
export class GameModule {}
