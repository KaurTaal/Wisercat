import {Component, HostListener, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzModalComponent, NzModalContentDirective, NzModalService} from "ng-zorro-antd/modal";
import {FilterFormComponent} from "../../forms/filter-form.component";
import {Filter} from "../../classes/Filter";
import {FilterService} from "../../services/filter.service";
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


  isRegularMode: boolean = false;

  maxRegularModalHeight: number = 0;
  minRegularModalHeight: number = 0;

  minRegularModalHeightMultiplier: number = 0.3;
  maxRegularModalHeightMultiplier: number = 0.8;

  isVisible: boolean = false;
  isClosable: boolean = false;

  constructor(private filterService: FilterService,
              private sharedDataService: SharedDataService,
              @Inject(PLATFORM_ID) private platformId: any) {

  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.maxRegularModalHeight = window.innerHeight * this.maxRegularModalHeightMultiplier;
      this.minRegularModalHeight = window.innerHeight * this.minRegularModalHeightMultiplier;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.maxRegularModalHeight = window.innerHeight * this.maxRegularModalHeightMultiplier;
      this.minRegularModalHeight = window.innerHeight * this.minRegularModalHeightMultiplier;
    }
  }

  toggleMode(): void {
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
    this.filterService.createFilter(newFilter).subscribe(res => {
      this.sharedDataService.emitFilterCreated(res);
    });
  }

  updateClosableStatus(status: boolean): void {
    this.isClosable = status;
  }


}
