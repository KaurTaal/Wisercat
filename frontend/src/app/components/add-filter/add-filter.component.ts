import {Component, EventEmitter, HostListener, Inject, OnInit, Output, PLATFORM_ID} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzModalComponent, NzModalContentDirective, NzModalService} from "ng-zorro-antd/modal";
import {FilterFormComponent} from "../../forms/filter-form.component";
import {Filter} from "../../classes/Filter";
import {FilterService} from "../../services/filter.service";
import {CriterionType} from "../../classes/enums/CriterionType";
import {Criterion} from "../../classes/Criterion";
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import {FormsModule} from "@angular/forms";
import {SharedDataService} from "../../services/shared-data-service";
import {ResizeWrapperComponent} from "../resize-wrapper/resize-wrapper.component";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'wc-add-filter',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzModalComponent,
    NzModalContentDirective,
    FilterFormComponent,
    NzSwitchComponent,
    FormsModule,
    ResizeWrapperComponent,
  ],
  providers: [
    NzModalService
  ],
  templateUrl: './add-filter.component.html',
  styleUrl: './add-filter.component.scss'
})
export class AddFilterComponent implements OnInit {

  @Output() filterCreated: EventEmitter<Filter> = new EventEmitter<Filter>();

  isRegularMode: boolean = false;

  maxRegularModalHeight: number = 0;
  minRegularModalHeight: number = 0;

  isVisible: boolean = false;
  isClosable: boolean = false;

  constructor(private filterService: FilterService,
              private sharedDataService: SharedDataService,
              @Inject(PLATFORM_ID) private platformId: any) {

  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.maxRegularModalHeight = window.innerHeight * 0.8;
      this.minRegularModalHeight = window.innerHeight * 0.5;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.maxRegularModalHeight = window.innerHeight * 0.8;
      this.minRegularModalHeight = window.innerHeight * 0.5;
    }
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
        if (crit.type === CriterionType.AMOUNT) {
          crit.valueDate = null;
          crit.valueTitle = null;
        }
        if (crit.type === CriterionType.DATE) {
          crit.valueAmount = null;
          crit.valueTitle = null;
        }
        if (crit.type === CriterionType.TITLE) {
          crit.valueDate = null;
          crit.valueAmount = null;
        }
      })
      filter.criterionDTOList = criteria;
    }
    return filter;
  }

}
