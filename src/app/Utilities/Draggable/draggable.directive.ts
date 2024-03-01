import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {

  private isDragging = false;
  private initialMouseX: number = 0 ;
  private initialMouseY: number = 0;
  private initialElementX: number = 0;
  private initialElementY: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onMouseDown(event: MouseEvent | TouchEvent): void {
    this.startDrag(event);
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  onMouseMove(event: MouseEvent | TouchEvent): void {
    this.handleDrag(event);
  }

  @HostListener('document:mouseup', ['$event'])
  @HostListener('document:touchend', ['$event'])
  onMouseUp(event: MouseEvent | TouchEvent): void {
    this.stopDrag();
  }

  private startDrag(event: MouseEvent | TouchEvent): void {
    this.isDragging = true;
    const touch = (event as TouchEvent).touches ? (event as TouchEvent).touches[0] : (event as MouseEvent);
    this.initialMouseX = touch.clientX;
    this.initialMouseY = touch.clientY;
    this.initialElementX = this.el.nativeElement.offsetLeft;
    this.initialElementY = this.el.nativeElement.offsetTop;
  }

  private handleDrag(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;
    const touch = (event as TouchEvent).touches ? (event as TouchEvent).touches[0] : (event as MouseEvent);
    const offsetX = touch.clientX - this.initialMouseX;
    const offsetY = touch.clientY - this.initialMouseY;

    const newElementX = this.initialElementX + offsetX;
    const newElementY = this.initialElementY + offsetY;

    this.renderer.setStyle(this.el.nativeElement, 'left', `${newElementX}px`);
    this.renderer.setStyle(this.el.nativeElement, 'top', `${newElementY}px`);
  }

  private stopDrag(): void {
    this.isDragging = false;
  }

}
