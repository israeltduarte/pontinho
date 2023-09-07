import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, MatchComponent, SettingsComponent } from './game';

const routes: Routes = [
  { path: '', component: MatchComponent },
  { path: 'home', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'match', component: MatchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
