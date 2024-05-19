import {Component, EventEmitter, Output} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzModalComponent, NzModalContentDirective, NzModalService} from "ng-zorro-antd/modal";
import {FilterModalContentComponent} from "../../modals/filter-modal-content/filter-modal-content.component";
import {Filter} from "../../classes/Filter";
import {FilterService} from "../../services/filter/filter.service";
import {CritType} from "../../classes/enums/CritType";
import {Criterion} from "../../classes/Criterion";
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-filter',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzModalComponent,
    NzModalContentDirective,
    FilterModalContentComponent,
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
  @Output() modalChangeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  isNonModalMode: boolean = false;
  isVisible: boolean = false;
  isClosable: boolean = false;

  constructor(private filterService: FilterService) {
  }

  toggleMode(): void {
    this.modalChangeEvent.emit(this.isNonModalMode);
  }

  showModal(): void {
    if (!this.isNonModalMode) {
      this.isVisible = true;
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
