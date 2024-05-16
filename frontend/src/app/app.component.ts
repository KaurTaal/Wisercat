import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HealthComponent} from "./components/health/health.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HealthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
