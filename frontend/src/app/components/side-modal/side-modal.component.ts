import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import {NgClass, NgIf, NgStyle} from "@angular/common";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {ResizeUtils} from "../../utils/ResizeUtils";
import {SharedDataService} from "../../services/shared-data-service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgStyle,
    DashboardComponent,
    NgClass,
    NgIf,
    NzIconDirective
  ],
  templateUrl: './side-modal.component.html',
  styleUrl: './side-modal.component.css'
})
export class SideModalComponent implements OnInit {

  modalStyle: string = 'close-modal';
  draggingCorner: boolean = false;

  maxHeight: number = 100;
  minHeight: number = 50;
  currentHeight: number = 100;

  private previousOffsetY: number | null = null;
  isMouseMovingUp: boolean = false;

  constructor(private renderer: Renderer2,
              private sharedDataService: SharedDataService,) {
  }

  ngOnInit(): void {
    this.sharedDataService.showNonModal.subscribe(status => {
      this.modalStyle = status ? 'open-modal' : 'close-modal';
    })
  }

  closeModal(): void {
    this.sharedDataService.setShowNonModal(false);
  }

  onCornerClick(event: MouseEvent): void {
    this.draggingCorner = true;
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('document:mouseup', ['$event'])
  onCornerRelease(): void {
    this.draggingCorner = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onCornerMove(event: MouseEvent): void {
    const sideModalElement = document.querySelector('.side-modal') as HTMLElement;

    if (!this.draggingCorner) {
      this.renderer.setStyle(document.body, 'cursor', 'auto');
      this.renderer.removeClass(sideModalElement, 'side-modal-no-transition');
      return;
    }

    this.renderer.addClass(sideModalElement, 'side-modal-no-transition');
    this.renderer.setStyle(document.body, 'cursor', 'nwse-resize');
    this.setDragDirection(event.clientY);
    this.currentHeight = ResizeUtils.setNewModalHeight(1, this.currentHeight, this.maxHeight, this.minHeight, this.isMouseMovingUp);
  }

  private setDragDirection(offsetY: number): void {
    if (this.previousOffsetY !== null) {
      this.isMouseMovingUp = offsetY < this.previousOffsetY;
    }
    this.previousOffsetY = offsetY;
  }

}
