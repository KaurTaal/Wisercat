import { Component } from '@angular/core';
import {HealthService} from "../../services/health.service";

@Component({
  selector: 'wc-health',
  standalone: true,
  imports: [],
  templateUrl: './health.component.html',
  styleUrl: './health.component.scss'
})
export class HealthComponent {
  status: string = "Server is down";

  constructor(private healthService: HealthService) {
  }

  getHealthCheck() {
    this.healthService.getHealthCheck().subscribe(res => {
      this.status = res.status;
    })
  }
}
