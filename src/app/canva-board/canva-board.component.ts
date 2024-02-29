import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-canva-board',
  templateUrl: './canva-board.component.html',
  styleUrls: ['./canva-board.component.css']
})
export class CanvaBoardComponent {

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D | null;
  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext("2d");
    this.setupCanvas();
    this.setHeaderLayout();
  }
  loadCanvas() {
    this.context?.beginPath();
    this.context?.arc(95, 50, 40, 0, 2 * Math.PI);
    this.context?.stroke();
  }

  setupCanvas() {
    const canvas = this.canvas.nativeElement;

    // Set canvas dimensions in millimeters
    const mmWidth = 210;
    const mmHeight = 297;

     // Scale factor (e.g., 0.9 means 90% of the original size)
     const scaleFactor = 0.6;

     // Adjusted canvas dimensions
     const adjustedWidth = mmWidth * scaleFactor;
     const adjustedHeight = mmHeight * scaleFactor;

    // Convert millimeters to pixels (assuming standard 96 DPI resolution)
    const pixelsWidth = adjustedWidth * 3.7795275590551;
    const pixelsHeight = adjustedHeight * 3.7795275590551;

    // Set canvas dimensions in pixels
    canvas.width = pixelsWidth;
    canvas.height = pixelsHeight;

  }

  setHeaderLayout() {
    // let context = this.canvas.nativeElement.getContext("2d");

    this.createBox(this.context, 10, 10, 150, 150);
    this.setText("Page Title", 250, 65,40);
    this.setText("Page Sub Title", 250, 120,30);
    
  }

  createBox(context1: any, x: number, y: number, width: number, height: number) {
    let context = this.canvas.nativeElement.getContext("2d");

    context?.rect(x, y, width, height);
    context?.stroke();
  }

  createLine(context: any, x1: number, y1: number, x2: number, y2: number) {
    this.moveTo(context, x1, y1);
    this.lineTo(context, x2, y2);
    context?.stroke();
  }

  moveTo(context: any, x: number, y: number) {
    context?.moveTo(x, y);
  }

  lineTo(context: any, x: number, y: number) {
    context?.lineTo(x, y);
  }

  setText(textValue: string, x: number, y: number, size: number) {
    this.context!.font = `${size}px serif`;
    this.context?.fillText(textValue, x, y);
  }

}
