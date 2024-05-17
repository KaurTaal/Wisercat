import {Component, inject, OnInit} from '@angular/core';
import {NzCollapseComponent, NzCollapsePanelComponent} from "ng-zorro-antd/collapse";
import {Filter} from "../../classes/Filter";
import {FilterService} from "../../services/filter/filter.service";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NzIconDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  private readonly filterService = inject(FilterService);

  filters: Filter[] = [];

  ngOnInit() {
    this.getAllFilters();
  }

  getAllFilters(): void {
    this.filterService.getAllFilters().subscribe(res => {
      this.filters.push(...res)
    })
  }

  handleSettingsClick(event: MouseEvent) {
    event.stopPropagation();
    console.log("Maybe add a delete function");
  }
}
