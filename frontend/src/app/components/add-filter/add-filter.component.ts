import {Component, EventEmitter, Output} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzModalComponent, NzModalContentDirective, NzModalService} from "ng-zorro-antd/modal";
import {FilterFormComponent} from "../../forms/filter-form.component";
import {Filter} from "../../classes/Filter";
import {FilterService} from "../../services/filter.service";
import {CritType} from "../../classes/enums/CritType";
import {Criterion} from "../../classes/Criterion";
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import {FormsModule} from "@angular/forms";
import {SharedDataService} from "../../services/shared-data-service";

@Component({
  selector: 'app-add-filter',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzModalComponent,
    NzModalContentDirective,
    FilterFormComponent,
    NzSwitchComponent,
    FormsModule,
  ],
  providers: [
    NzModalService
  ],
  templateUrl: './add-filter.component.html',
  styleUrl: './add-filter.component.css'
})
export class AddFilterComponent {

  @Output() filterCreated: EventEmitter<Filter> = new EventEmitter<Filter>();

  isRegularMode: boolean = false;

  isVisible: boolean = false;
  isClosable: boolean = false;

  constructor(private filterService: FilterService,
              private sharedDataService: SharedDataService,) {
  }

  toggleMode() {
    if (!this.isRegularMode) {
      this.sharedDataService.setShowNonModal(false);
    }
  }

  showModal(): void {
    if (this.isRegularMode) {
      this.isVisible = true;
    } else {
      this.sharedDataService.setShowNonModal(true);
    }
  }

  handleCancel(isModalVisible: boolean): void {
    this.isVisible = isModalVisible;
  }

  handleSave(newFilter: Filter): void {
    this.isVisible = false;
    this.filterService.createFilter(this.sanitizeValueFields(newFilter)).subscribe(res => {
      this.filterCreated.emit(res);
    });
  }

  updateClosableStatus(status: boolean): void {
    this.isClosable = status;
  }


  //TODO Do this better. Maybe during the modal entries. Probably will change when fields will be converted to form fields.
  private sanitizeValueFields(filter: Filter): Filter {
    if (filter.criterionDTOList) {
      let criteria: Criterion[] = filter.criterionDTOList;
      criteria.forEach(crit => {
        if (crit.type === CritType.AMOUNT) {
          crit.valueDate = null;
          crit.valueTitle = null;
        }
        if (crit.type === CritType.DATE) {
          crit.valueAmount = null;
          crit.valueTitle = null;
        }
        if (crit.type === CritType.TITLE) {
          crit.valueDate = null;
          crit.valueAmount = null;
        }
      })
      filter.criterionDTOList = criteria;
    }
    return filter;
  }

}
