import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HealthComponent} from "./components/health/health.component";
import {AddFilterComponent} from "./components/add-filter/add-filter.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HealthComponent, AddFilterComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
