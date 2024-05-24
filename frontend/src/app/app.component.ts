import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AddFilterComponent} from "./components/add-filter/add-filter.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SideModalComponent} from "./components/side-modal/side-modal.component";
import {ResizeWrapperComponent} from "./components/resize-wrapper/resize-wrapper.component";
import {FilterFormComponent} from "./forms/filter-form.component";
import {AlertComponent} from "./alert/alert.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddFilterComponent, DashboardComponent, SideModalComponent, ResizeWrapperComponent, FilterFormComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string = 'frontend';
}
