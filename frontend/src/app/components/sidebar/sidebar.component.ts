import {Component, HostListener, Renderer2} from '@angular/core';
import {NgClass, NgIf, NgStyle} from "@angular/common";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {ResizeUtils} from "../../utils/ResizeUtils";

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
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  isCollapsed: boolean = false;
  menuStyle: string = 'close-menu';
  draggingCorner: boolean = false;

  maxHeight: number = 100;
  minHeight: number = 50;
  currentHeight: number = 100;

  private previousOffsetY: number | null = null;
  isMouseMovingUp: boolean = false;

  constructor(private renderer: Renderer2) {
  }

  toggleMenuBar(): void {
    this.menuStyle = this.menuStyle === 'close-menu' ? 'open-menu' : 'close-menu';
    this.isCollapsed = !this.isCollapsed;
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
    if (!this.draggingCorner) {
      this.renderer.setStyle(document.body, 'cursor', 'auto');
      return;
    }
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
