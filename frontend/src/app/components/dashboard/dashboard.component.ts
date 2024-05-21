import {Component, Input, OnInit} from '@angular/core';
import {NzCollapseComponent, NzCollapsePanelComponent} from "ng-zorro-antd/collapse";
import {Filter} from "../../classes/Filter";
import {FilterService} from "../../services/filter.service";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {AddFilterComponent} from "../add-filter/add-filter.component";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'wc-dashboard',
  standalone: true,
  imports: [
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NzIconDirective,
    AddFilterComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {
  @Input() filters: Filter[] = [];

  constructor(private filterService: FilterService,
              private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.getAllFilters();
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


  createNotification(type: string): void {
    this.notification.create(
      type,
      'Filter saved successfully!',
      ''
    );
  }
}
