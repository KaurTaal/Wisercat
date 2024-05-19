import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzCollapseComponent, NzCollapsePanelComponent} from "ng-zorro-antd/collapse";
import {Filter} from "../../classes/Filter";
import {FilterService} from "../../services/filter/filter.service";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {AddFilterComponent} from "../add-filter/add-filter.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NzIconDirective,
    AddFilterComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {


  @Input() filters: Filter[] = [];
  @Output() modalChangeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private filterService: FilterService) {
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

  handleModalChange(isNonModalMode: boolean): void {
    this.modalChangeEvent.emit(isNonModalMode);
  }
}
