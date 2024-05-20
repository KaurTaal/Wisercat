import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HealthComponent} from "./components/health/health.component";
import {AddFilterComponent} from "./components/add-filter/add-filter.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SideModalComponent} from "./components/side-modal/side-modal.component";
import {SharedDataService} from "./services/shared-data-service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HealthComponent, AddFilterComponent, DashboardComponent, SideModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title: string = 'frontend';

  isNonModalActive: boolean = false;

  constructor(private sharedDataService: SharedDataService) {
  }

  ngOnInit() {
    this.sharedDataService.isNonModalActive.subscribe(status => {
      this.isNonModalActive = status;
    })
  }

}
