import { Component } from '@angular/core';
import { Player } from 'src/app/core/models';
import data from '../../../../api/data.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  players!: Player[];
  roundNumber!: number;
  round!: Map<string, number>;
  canSubmit!: boolean;
  highestTotal!: number;
  roundWinner!: Player;

  ngOnInit() {
    this.players = data.players;
    this.roundNumber = 1;
    this.round = new Map<string, number>();
    this.canSubmit = false;
    this.highestTotal = 0;
  }

  submitScores() {
    if (this.canSubmit) {
      this.updateRoundScores();
      this.updateScores();
    }
  }

  updateRoundScores() {
    this.players
      .filter((player) => player.isPlaying)
      .forEach((player) => {
        let score = parseInt(this.getInputValue(player.id));
        if (score == 0) {
          this.roundWinner = player;
        }
        this.round.set(player.id, score);
      });
  }

  getInputValue(playerId: string): string {
    const inputElement: HTMLInputElement | null = document.getElementById(
      'score_' + playerId
    ) as HTMLInputElement;
    return inputElement ? inputElement.value : '';
  }

  updateScores() {
    this.players
      .filter((player) => player.isPlaying)
      .forEach((player) => {
        this.addScore(player, this.round.get(player.id)!);
        this.clearNewScoreField(player);
      });

    this.highestTotal = this.getHighestValidTotal();
    this.updatePlayersThatExploded();
  }

  addScore(player: Player, score: number) {
    this.addPoints(player, score);
    this.updateTotal(player, score);
    this.updateScape(player);
  }

  addPoints(player: Player, newScore: number) {
    player.points.push(newScore);
  }

  updateTotal(player: Player, newScore: number) {
    player.total = player.total + newScore;
    if (player.total > 99) {
      if (player.hasExploded) {
        this.eliminatePlayer(player);
        player.isPlaying = false;
      }
      player.hasExploded = true;
    }
  }

  updateScape(player: Player) {
    if (player.isPlaying) {
      player.scape = 99 - player.total;
    }
  }

  updatePlayersThatExploded() {
    let playingPlayers = this.players.filter((player) => player.isPlaying);

    let explodedPlayers = this.players
      .filter((player) => player.isPlaying)
      .filter((player) => player.total > 99);

    if (explodedPlayers.length == playingPlayers.length - 1) {
      explodedPlayers
        .filter((player) => player.isPlaying)
        .forEach((player) => this.eliminatePlayer(player));
    }

    this.players
      .filter((player) => player.isPlaying)
      .filter((player) => player.total > 99)
      .forEach((player) => this.explodePlayer(player));
  }

  explodePlayer(player: Player) {
    player.hasExplodedWith = player.total;
    player.total = this.highestTotal;
    player.isBackWith = player.total;
    this.updateScape(player);
  }

  eliminatePlayer(player: Player) {
    player.isPlaying = false;
  }

  getHighestValidTotal(): number {
    return this.players
      .filter((player) => player.total <= 99)
      .reduce((highestTotal: number, currentPlayer: Player) => {
        return Math.max(highestTotal, currentPlayer.total);
      }, 0);
  }

  enableSubmitButton() {
    this.canSubmit = this.players
      .filter((player) => player.isPlaying)
      .every((player) => {
        const inputValue = this.getInputValue(player.id);
        return inputValue !== '' && inputValue !== null;
      });
  }

  clearNewScoreField(player: Player) {
    const inputElement = document.getElementById(
      'score_' + player.id
    ) as HTMLInputElement;
    inputElement.value = '';
    this.enableSubmitButton();
  }
}
