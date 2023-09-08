import { Component, Input, OnInit } from '@angular/core';
import { Player, newEmptyPlayer } from 'src/app/core/models';
import { SharedService } from 'src/app/shared/shared.service';
import data from '../../../../api/data.json';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  players: Player[] = [];
  @Input() newPlayerName: string = '';
  @Input() maxPoints: number = 100;
  @Input() maxExplosions: number = 1;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.players = data.players;
  }

  addPlayer() {
    const newPlayer = newEmptyPlayer();
    newPlayer.name = this.newPlayerName;
    this.players.push(newPlayer);
    this.clearNewPlayerField();
  }

  clearNewPlayerField() {
    this.newPlayerName = '';
  }

  removePlayer(player: Player) {
    const index = this.players.indexOf(player);
    if (index !== -1) {
      this.players.splice(index, 1);
    }
  }

  updatePlayers(): void {
    this.sharedService.setPlayers(this.players);
  }

  updateMaxPoints(): void {
    this.sharedService.setMaxPoints(this.maxPoints);
  }

  updateMaxExplosions(): void {
    this.sharedService.setMaxExplosions(this.maxExplosions);
  }

  saveConfigs() {
    let id = 1;
    this.players.forEach((player) => {
      player.id = 'player' + id++;
      player.explosionsLeft = this.maxExplosions;
      player.scape = this.maxPoints - 1;
    });
    this.updatePlayers();
    this.updateMaxPoints();
    this.updateMaxExplosions();
  }
}
