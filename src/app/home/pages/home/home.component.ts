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
  score!: Map<string, number>;
  canSubmit!: boolean;
  highestTotal!: number;

  ngOnInit() {
    this.players = data.players;
    this.score = new Map<string, number>();
    this.canSubmit = false;
    this.highestTotal = 0;
  }

  restartGame() {
    console.log('restartGame');
  }

  submitScores() {
    if (this.canSubmit) {
      this.updateScore();
      this.updatePlayers();
      this.startNewRound();
    }
  }

  startNewRound() {
    this.score = new Map<string, number>();
    this.canSubmit = false;
  }

  updateScore() {
    this.players
      .filter((player) => player.isPlaying)
      .forEach((player) => {
        let score = parseInt(this.getInputValue(player.id));
        this.score.set(player.id, score);
      });
  }

  getInputValue(playerId: string): string {
    const inputElement: HTMLInputElement | null = document.getElementById(
      'score_' + playerId
    ) as HTMLInputElement;
    return inputElement ? inputElement.value : '';
  }

  updatePlayers() {
    this.players
      .filter((player) => player.isPlaying)
      .forEach((player) => {
        this.updatePoints(player);
        this.updateTotal(player);
        this.updateScape(player);
        this.clearNewScoreField(player);
      });

    this.players
      .filter((player) => !player.isPlaying)
      .forEach((player) => {
        this.fillPointsWithDash(player);
      });

    this.highestTotal = this.getHighestValidTotal();

    this.updatePlayersThatExploded();
    this.updatePlayersThatWereEliminated();
  }

  updatePoints(player: Player) {
    const newScore = this.score.get(player.id);
    player.points.push(Number(newScore));
  }

  updateTotal(player: Player) {
    player.total = player.total + Number(this.score.get(player.id));
    if (player.total > 99) {
      !player.hasExploded
        ? this.explodePlayer(player)
        : this.eliminatePlayer(player);
    }
  }

  updateScape(player: Player) {
    if (player.isPlaying) {
      player.scape = 99 - player.total;
    }
  }

  fillPointsWithDash(player: Player) {
    let pointsLength = this.players.filter((player) => player.isPlaying)[0]
      .points.length;

    if (pointsLength > player.points.length) {
      player.points.push('-');
    }
  }

  updatePlayersThatExploded() {
    this.checkIfSomeoneWonTheGame();

    this.players
      .filter((player) => player.isPlaying)
      .filter((player) => player.total > 99)
      .forEach((player) => this.updateExplodedPlayerInfo(player));
  }

  updatePlayersThatWereEliminated() {
    this.players
      .filter((player) => !player.isPlaying)
      .forEach((player) => this.eliminatePlayer(player));
  }

  checkIfSomeoneWonTheGame() {
    const playingPlayers = this.players
      .filter((player) => player.isPlaying)
      .filter((player) => !player.hasExploded);

    if (playingPlayers.length === 1) {
      this.players
        .filter((player) => player.hasExploded)
        .forEach((player) => this.eliminatePlayer(player));
    }
  }

  updateExplodedPlayerInfo(player: Player) {
    player.hasExplodedWith = player.total;
    player.total = this.getHighestValidTotal();
    player.isBackWith = player.total;
    this.updateScape(player);
  }

  explodePlayer(player: Player) {
    player.hasExploded = true;
  }

  eliminatePlayer(player: Player) {
    player.isPlaying = false;
    player.scape = '-';
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
        return (
          inputValue !== '' && inputValue !== null && Number(inputValue) >= 0
        );
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
