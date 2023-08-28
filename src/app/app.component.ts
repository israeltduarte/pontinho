import { Component } from '@angular/core';
import * as data from '../api/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'myinvoice-app';
  header = data;
}
