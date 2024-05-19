import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HealthComponent} from "./components/health/health.component";
import {AddFilterComponent} from "./components/add-filter/add-filter.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HealthComponent, AddFilterComponent, DashboardComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'frontend';
  isNonModalMode: boolean = false;


  handleModalChange(isNonModal: boolean) {
    this.isNonModalMode = !isNonModal;
  }

}
