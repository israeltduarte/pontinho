import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigsModalComponent } from 'src/app/components/configs-modal/configs-modal.component';
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
  @ViewChild('modal') modal!: ConfigsModalComponent;

  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.players = data.players;
  }

  openModal() {
    setTimeout(() => {
      this.modal.toggle();
    }, 1000);
  }

  navigateToMatchPage(): void {
    this.router.navigate(['/match']);
  }

  addPlayer() {
    if (this.newPlayerName != null && this.newPlayerName.trim() != '') {
      const newPlayer = newEmptyPlayer();
      newPlayer.name = this.newPlayerName;
      if (this.players[0] != null && this.players[0] != undefined) {
        newPlayer.lifes = this.players[0].lifes;
        newPlayer.scape = this.players[0].scape;
      } else {
        newPlayer.lifes = 2;
        newPlayer.scape = 100;
      }
      this.players.push(newPlayer);
      this.clearNewPlayerField();
    }
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
    if (this.maxPoints != undefined && this.maxPoints != null) {
      this.sharedService.setMaxPoints(this.maxPoints);
    } else {
      this.maxPoints = 100;
    }
  }

  updateMaxExplosions(): void {
    if (this.maxExplosions != undefined && this.maxExplosions != null) {
      this.sharedService.setMaxExplosions(this.maxExplosions);
    } else {
      this.maxPoints = 100;
    }
  }

  saveConfigs() {
    let id = 1;
    this.players.forEach((player) => {
      player.id = 'player' + id++;
      player.lifes = this.maxExplosions;
      player.scape = this.maxPoints - 1;
    });
    this.updatePlayers();
    this.updateMaxPoints();
    this.updateMaxExplosions();
  }
}
