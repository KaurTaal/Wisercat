import {Component, Input, OnInit} from '@angular/core';
import {NzCollapseComponent, NzCollapsePanelComponent} from "ng-zorro-antd/collapse";
import {Filter} from "../../classes/Filter";
import {FilterService} from "../../services/filter.service";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {AddFilterComponent} from "../add-filter/add-filter.component";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {SharedDataService} from "../../services/shared-data-service";
import {Subscription} from "rxjs";
import {NzCardComponent} from "ng-zorro-antd/card";

@Component({
  selector: 'wc-dashboard',
  standalone: true,
  imports: [
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NzIconDirective,
    AddFilterComponent,
    NzButtonComponent,
    NzCardComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {
  @Input() filters: Filter[] = [];
  filterSubscription: Subscription | undefined;

  constructor(private filterService: FilterService,
              private sharedDataService: SharedDataService,
              ) {
  }

  ngOnInit(): void {
    this.getAllFilters();

    this.filterSubscription = this.sharedDataService.filterCreated$.subscribe(filter => {
      this.onFilterSave(filter);
    })
  }

  onFilterSave(filter: Filter): void {
    this.filters.push(filter);
  }

  getAllFilters(): void {
    this.filterService.getAllFilters().subscribe(res => {
      this.filters.push(...res)
    })
  }

  handleSettingsClick(event: MouseEvent): void {
    event.stopPropagation();
    console.log("Maybe add a delete function"); //TODO Add delete func?
  }

}
