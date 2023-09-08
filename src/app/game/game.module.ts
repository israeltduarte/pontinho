import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigsModalModule } from '../components/configs-modal/configs-modal.module';
import { WinnerModalModule } from '../components/winner-modal/winnder-modal.module';
import { SharedModule } from '../shared';
import { HomeComponent } from './pages';
import { MatchComponent } from './pages/match/match.component';
import { SettingsComponent } from './pages/settings/settings.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    WinnerModalModule,
    ConfigsModalModule,
  ],
  providers: [],
  declarations: [HomeComponent, MatchComponent, SettingsComponent],
})
export class GameModule {}
