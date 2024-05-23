import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewChild
} from '@angular/core';
import {NzIconDirective} from "ng-zorro-antd/icon";
import {ResizeUtils} from "../../utils/ResizeUtils";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'wc-resize-wrapper',
  standalone: true,
  imports: [
    NzIconDirective
  ],
  templateUrl: './resize-wrapper.component.html',
  styleUrl: './resize-wrapper.component.scss'
})
export class ResizeWrapperComponent implements OnInit, AfterViewInit {

  @Input({required: false, transform: booleanAttribute}) isInFullHeightByDefault: boolean = false;
  @Input() maxContainerHeight: number = 0;
  @Input() minContainerHeight: number = 0;
  @ViewChild('resizeContainer') resizeContainer!: ElementRef

  draggingCorner: boolean = false;

  resizeSpeed: number = 10;
  maxHeightPercentage: number = 0.7;
  minHeightPercentage: number = 0.4;
  maxHeight: number = 0;
  minHeight: number = 0;

  previousOffsetY: number | null = null;
  isMouseMovingUp: boolean = false;
  currentHeight?: number;

  constructor(private renderer: Renderer2,
              @Inject(PLATFORM_ID) private platformId: any,
              private cdr: ChangeDetectorRef,
  ) {

  }

  ngOnInit() {
    this.setMinAndMaxHeight();
  }

  ngAfterViewInit() {
    this.currentHeight = this.resizeContainer.nativeElement.offsetHeight;
    this.cdr.detectChanges();
  }

  onCornerClick(event: MouseEvent): void {
    if (!this.currentHeight) {
      this.currentHeight = this.resizeContainer.nativeElement.offsetHeight;
    }
    this.draggingCorner = true;
    event.preventDefault();
    event.stopPropagation();
  }


  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.setMinAndMaxHeight();
  }

  @HostListener('document:mouseup', ['$event'])
  onCornerRelease(): void {
    this.draggingCorner = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onCornerMove(event: MouseEvent): void {
    if (this.currentHeight) {
      if (!this.draggingCorner) {
        this.renderer.setStyle(document.body, 'cursor', 'auto');
        return;
      }

      this.renderer.setStyle(document.body, 'cursor', 'nwse-resize');
      this.setDragDirection(event.clientY);
      this.currentHeight = ResizeUtils.setNewModalHeight(this.resizeSpeed, this.currentHeight, this.maxContainerHeight, this.minContainerHeight, this.isMouseMovingUp);
    }
  }

  private setDragDirection(offsetY: number): void {
    if (this.previousOffsetY !== null) {
      this.isMouseMovingUp = offsetY < this.previousOffsetY;
    }
    this.previousOffsetY = offsetY;
  }


  private setMinAndMaxHeight(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.maxHeight = window.innerHeight * this.maxHeightPercentage;
      this.minHeight = window.innerHeight * this.minHeightPercentage;
    }
  }
}
