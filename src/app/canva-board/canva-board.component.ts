import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-canva-board',
  templateUrl: './canva-board.component.html',
  styleUrls: ['./canva-board.component.css']
})
export class CanvaBoardComponent {

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('zoomContainer', { static: true }) zoomContainerRef!: ElementRef;
  private context!: CanvasRenderingContext2D | null;
  titlePositionX: number = 250;
  titlePositionY: number = 65;
  subTitlePositionX: number = 250;
  subTitlePositionY: number = 120;
  staticTitle: string = "Username";
  staticSubTitle: string = "Designation";
  username: string = "";
  designation: string = "";
  img: HTMLImageElement = new Image();
  canvasWidth: number = 0;
  canvasHeight: number = 0;
  minScale: number = 0.8;
  maxScale: number = 3.0;
  scale: number = 1.0;
  zoomFactor: number = 1;
  minZoomFactor: number = 0.2;
  maxZoomFactor: number = 2.0;
  zoomSpeed: number = 0.1;
  selectedFont: string = "serif";
  fonts: string[] = ['Arial', 'Times New Roman', 'Verdana', 'Courier New', 'serif', 'sans-serif', 'monospace'];
  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext("2d");
    this.setupCanvas();
    this.setHeaderLayout();
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
    this.canvasWidth = pixelsWidth;
    this.canvasHeight = pixelsHeight;
  }

  setHeaderLayout() {
    // Draw initial layout
    this.createBox(10, 10, 150, 150);
    this.setText(this.username || this.staticTitle, this.titlePositionX, this.titlePositionY, 20);
    this.setText(this.designation || this.staticSubTitle, this.subTitlePositionX, this.subTitlePositionY, 20);
  }


  createBox(x: number, y: number, width: number, height: number) {
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
    this.context!.font = `${size}px ${this.selectedFont}`;
    this.context?.fillText(textValue, x, y);
  }

  updateCanvas() {
    // Clear canvas
    this.context?.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    // Get form input values
    this.username = (document.getElementById('username') as HTMLInputElement).value;
    this.designation = (document.getElementById('designation') as HTMLInputElement).value;

    this.setHeaderLayout();
  }
  zoomIn() {
    this.zoomFactor *= 1.2;
    this.applyZoom();
    this.limitZoom();
  }

  zoomOut() {
    this.zoomFactor /= 1.2;
    this.applyZoom();
    this.limitZoom();
  }

  applyZoom() {
    this.canvas.nativeElement.style.transform = `scale(${this.zoomFactor})`;
  }
  handleZoom(event: WheelEvent) {
    const delta = event.deltaY || event.detail || 0;
    if (delta > 0) {
      this.zoomOut();
    } else {
      this.zoomIn();
    }
    event.preventDefault();
  }
  limitZoom() {
    this.zoomFactor = Math.max(this.minZoomFactor, Math.min(this.maxZoomFactor, this.zoomFactor));
  }
  
}
