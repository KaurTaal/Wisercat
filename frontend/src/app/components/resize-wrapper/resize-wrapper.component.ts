import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit, booleanAttribute,
  Component,
  ElementRef,
  HostListener, Input,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {NzIconDirective} from "ng-zorro-antd/icon";
import {ResizeUtils} from "../../utils/ResizeUtils";
import {NonNullableFormBuilder} from "@angular/forms";

@Component({
  selector: 'app-resize-wrapper',
  standalone: true,
  imports: [
    NzIconDirective
  ],
  templateUrl: './resize-wrapper.component.html',
  styleUrl: './resize-wrapper.component.scss'
})
export class ResizeWrapperComponent {

  @Input({required:false, transform: booleanAttribute}) isInFullHeightByDefault = false;
  @ViewChild('resizeContainer') resizeContainer!: ElementRef

  draggingCorner: boolean = false;
  maxHeight: number = window.innerHeight * 0.7;
  minHeight: number = window.innerHeight * 0.4;
  private previousOffsetY: number | null = null;
  isMouseMovingUp: boolean = false;
  currentHeight?:number;

  constructor(private renderer: Renderer2,
  ) {

  }


  onCornerClick(event: MouseEvent): void {
    if (!this.currentHeight){
      this.currentHeight = this.resizeContainer.nativeElement.offsetHeight;
    }
    this.draggingCorner = true;
    event.preventDefault();
    event.stopPropagation();
  }


  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateHeightLimits();
  }

  updateHeightLimits(): void {
    this.maxHeight = window.innerHeight * 0.7;
    this.minHeight = window.innerHeight * 0.4;
  }

  @HostListener('document:mouseup', ['$event'])
  onCornerRelease(): void {
    this.draggingCorner = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onCornerMove(event: MouseEvent): void {
    if (this.currentHeight){
      if (!this.draggingCorner) {
        this.renderer.setStyle(document.body, 'cursor', 'auto');
        return;
      }
      this.renderer.setStyle(document.body, 'cursor', 'nwse-resize');
      this.setDragDirection(event.clientY);
      this.currentHeight = ResizeUtils.setNewModalHeight(5, this.currentHeight, this.maxHeight, this.minHeight, this.isMouseMovingUp);
    }
  }


  private setDragDirection(offsetY: number): void {
    if (this.previousOffsetY !== null) {
      this.isMouseMovingUp = offsetY < this.previousOffsetY;
    }
    this.previousOffsetY = offsetY;
  }


}
