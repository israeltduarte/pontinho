import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/core/models';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  players!: Player[];
  ngOnInit(): void {}
}
