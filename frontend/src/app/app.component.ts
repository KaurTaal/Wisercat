import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HealthComponent} from "./components/health/health.component";
import {AddFilterComponent} from "./components/add-filter/add-filter.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SideModalComponent} from "./components/side-modal/side-modal.component";
import {ResizeWrapperComponent} from "./components/resize-wrapper/resize-wrapper.component";
import {FilterFormComponent} from "./forms/filter-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HealthComponent, AddFilterComponent, DashboardComponent, SideModalComponent, ResizeWrapperComponent, FilterFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string = 'frontend';
}
