import {Component, Input, OnInit} from '@angular/core';
import {NzCollapseComponent, NzCollapsePanelComponent} from "ng-zorro-antd/collapse";
import {Filter} from "../../model/Filter";
import {FilterService} from "../../services/filter.service";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {AddFilterComponent} from "../add-filter/add-filter.component";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {SharedDataService} from "../../services/shared-data-service";
import {Subscription} from "rxjs";
import {NzCardComponent} from "ng-zorro-antd/card";
import {AlertBroker} from "../../alert/alert-broker";
import {AlertType} from "../../alert/alert.model";
import {Response} from "../../model/enums/Response";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {ReactiveFormsModule} from "@angular/forms";
import {Criterion} from "../../model/Criterion";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'wc-dashboard',
  standalone: true,
  providers: [
    DatePipe
  ],
  imports: [
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NzIconDirective,
    AddFilterComponent,
    NzButtonComponent,
    NzCardComponent,
    NzDatePickerComponent,
    NzInputDirective,
    NzInputNumberComponent,
    NzOptionComponent,
    NzSelectComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {
  @Input() filters: Filter[] = [];
  filterSubscription: Subscription | undefined;

  constructor(private filterService: FilterService,
              private sharedDataService: SharedDataService,
              private alertBroker: AlertBroker,
              private datePipe: DatePipe,
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
    this.alertBroker.add(Response.SUCCESS, AlertType.SUCCESS);
  }

  getAllFilters(): void {
    this.filterService.getAllFilters().subscribe(res => {
      this.filters.push(...res)
    })
  }

  handleDelete(filter: Filter) {
    if (filter.filterId) {
      this.filterService.deleteFilterById(filter.filterId).subscribe(() => {
        let filterIndex: number = this.filters.indexOf(filter);
        this.filters.splice(filterIndex, 1);
        this.alertBroker.add(Response.DELETE_SUCCESS, AlertType.SUCCESS);
      })
    }
  }

  getCriterionValue(criterion: Criterion): string | number | Date {
    if (criterion.valueAmount) {
      return criterion.valueAmount;
    } else if (criterion.valueTitle) {
      return criterion.valueTitle;
    } else {
      return this.datePipe.transform(criterion.valueDate, 'yyyy-MM-dd') || '';
    }
  }

}
