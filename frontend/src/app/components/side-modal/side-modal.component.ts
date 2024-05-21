import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {NgClass, NgIf, NgStyle} from "@angular/common";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {SharedDataService} from "../../services/shared-data-service";
import {FilterFormComponent} from "../../forms/filter-form.component";
import {ResizeWrapperComponent} from "../resize-wrapper/resize-wrapper.component";

@Component({
  selector: 'wc-sidebar',
  standalone: true,
  imports: [
    NgStyle,
    DashboardComponent,
    NgClass,
    NgIf,
    NzIconDirective,
    FilterFormComponent,
    ResizeWrapperComponent
  ],
  templateUrl: './side-modal.component.html',
  styleUrl: './side-modal.component.scss'
})
export class SideModalComponent implements OnInit, AfterViewInit {

  @ViewChild('sideModalContainer') sideModal!: ElementRef;
  modalStyle: string = 'close-modal';
  maxHeightForWrapper: number = 0;
  minHeightForWrapper: number = 0;
  percentageOfFullHeightMultiplier: number = 0.6;

  constructor(
              private sharedDataService: SharedDataService,
              private cdr: ChangeDetectorRef,
              ) {
  }

  ngOnInit(): void {
    this.sharedDataService.showNonModal.subscribe(status => {
      this.modalStyle = status ? 'open-modal' : 'close-modal';
    })
  }

  ngAfterViewInit(): void {
    this.maxHeightForWrapper = this.sideModal.nativeElement.offsetHeight;
    this.minHeightForWrapper = this.sideModal.nativeElement.offsetHeight * this.percentageOfFullHeightMultiplier;
    this.cdr.detectChanges();
  }

  closeModal(): void {
    this.sharedDataService.setShowNonModal(false);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.maxHeightForWrapper = this.sideModal.nativeElement.offsetHeight;
    this.minHeightForWrapper = this.sideModal.nativeElement.offsetHeight * this.percentageOfFullHeightMultiplier;
  }
}
