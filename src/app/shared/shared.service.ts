import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../core/models';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private maxPointsSubject = new BehaviorSubject<number>(100);
  maxPoints$ = this.maxPointsSubject.asObservable();
  private maxExplosionsSubject = new BehaviorSubject<number>(1);
  maxExplosions$ = this.maxExplosionsSubject.asObservable();
  private playersSubject = new BehaviorSubject<Player[]>([]);
  players$ = this.playersSubject.asObservable();

  setMaxPoints(value: number) {
    this.maxPointsSubject.next(value);
  }

  setMaxExplosions(value: number) {
    this.maxExplosionsSubject.next(value);
  }

  setPlayers(players: Player[]) {
    this.playersSubject.next(players);
  }
}
