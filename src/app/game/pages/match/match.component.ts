import { Component, OnInit, ViewChild } from '@angular/core';
import { WinnerModalComponent } from 'src/app/components/winner-modal/winner-modal.component';
import { Player } from 'src/app/core/models';
import data from '../../../../api/data.json';

@Component({
  selector: 'match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
})
export class MatchComponent implements OnInit {
  players!: Player[];
  score!: Map<string, number>;
  canSubmit!: boolean;
  highestTotal!: number;
  winner!: String;
  @ViewChild('modal') modal!: WinnerModalComponent;

  ngOnInit(): void {
    this.players = data.players;
    this.score = new Map<string, number>();
    this.canSubmit = false;
    this.highestTotal = 0;
  }

  restartGame(): void {
    if (this.modal.showModal) {
      this.modal.toggle();
    }

    this.players.forEach((player) => {
      player.points = [];
      player.total = 0;
      player.scape = 99;
      player.hasExploded = false;
      player.isPlaying = true;
    });
    this.canSubmit = false;
    this.score.clear();
    this.highestTotal = 0;
  }

  submitScores(): void {
    if (this.canSubmit) {
      this.updateScore();
      this.updatePlayers();
      this.startNewRound();
    }
  }

  startNewRound(): void {
    this.score = new Map<string, number>();
    this.canSubmit = false;
  }

  updateScore(): void {
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

  updatePlayers(): void {
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

  updatePlayersThatExploded(): void {
    this.checkIfSomeoneWonTheGame();

    this.players
      .filter((player) => player.isPlaying)
      .filter((player) => player.total > 99)
      .forEach((player) => this.updateExplodedPlayerInfo(player));
  }

  updatePlayersThatWereEliminated(): void {
    this.players
      .filter((player) => !player.isPlaying)
      .forEach((player) => this.eliminatePlayer(player));
  }

  checkIfSomeoneWonTheGame(): void {
    const playingPlayers = this.players
      .filter((player) => player.isPlaying)
      .filter((player) => !player.hasExploded);

    if (playingPlayers.length === 1) {
      this.players
        .filter((player) => player.hasExploded)
        .forEach((player) => this.eliminatePlayer(player));
      this.winner = playingPlayers[0].name;
      setTimeout(() => {
        this.modal.toggle();
      }, 2000);
    }
  }

  updateExplodedPlayerInfo(player: Player): void {
    player.hasExplodedWith = player.total;
    player.total = this.getHighestValidTotal();
    player.isBackWith = player.total;
    this.updateScape(player);
  }

  explodePlayer(player: Player): void {
    player.hasExploded = true;
  }

  eliminatePlayer(player: Player): void {
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

  enableSubmitButton(): void {
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
