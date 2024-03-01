import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-canva-board',
  templateUrl: './canva-board.component.html',
  styleUrls: ['./canva-board.component.css']
})
export class CanvaBoardComponent {

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D | null;
  private img: HTMLImageElement = new Image();
  private scale = 1.0;
  private minScale = 0.2;
  private maxScale = 2.0;
  private zoomSpeed = 0.1;
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
    this.context?.rect(x, y, width, height);
    this.context?.stroke();
    this.img.src = "https://images.unsplash.com/photo-1600647993560-11a92e039466?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fHw%3D";

    // Wait for the image to be fully loaded
    this.img.onload = () => {
      this.context?.drawImage(this.img, 10, 10, width, height);
    };
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
