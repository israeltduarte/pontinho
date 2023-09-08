import { Component, Input, OnInit } from '@angular/core';
import { Player, newEmptyPlayer } from 'src/app/core/models';
import data from '../../../../api/data.json';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  players!: Player[];
  @Input() newPlayer: string = '';
  @Input() maxPoints: number = 100;
  @Input() maxExplosions: number = 1;

  ngOnInit(): void {
    this.players = data.players;
  }

  addPlayer() {
    var newPlayer = newEmptyPlayer();
    newPlayer.name = this.newPlayer;
    this.players.push(newPlayer);
    this.clearNewPlayerField();
  }

  clearNewPlayerField() {
    this.newPlayer = '';
  }

  removePlayer(player: Player) {
    const index = this.players.indexOf(player);
    if (index !== -1) {
      this.players.splice(index, 1);
    }
  }

  defineMax() {
    console.log('define new max');
  }

  defineExplosions() {
    console.log('define max explosions');
  }

  saveConfigs() {
    console.log('save configurations');
  }
}
