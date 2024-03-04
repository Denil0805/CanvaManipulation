import { Component, ViewChild, ElementRef } from '@angular/core';

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

    // Scale factor (e.g., 0.6 means 60% of the original size)
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
    this.drawTextWithMaxDimensions(this.username || this.staticTitle, this.titlePositionX, this.titlePositionY, 20, 150);
    this.drawTextWithMaxDimensions(this.designation || this.staticSubTitle, this.subTitlePositionX, this.subTitlePositionY, 20, 150);
  }


  createBox(x: number, y: number, width: number, height: number) { x 
    this.context?.rect(x, y, width, height);
    this.context?.stroke();
  }

  drawTextWithMaxDimensions(text: string, x: number, y: number, size: number, maxWidth: number) {
    const words = text.split(' ');
    let currentLine = '';
    let currentY = y;

    for (const word of words) {
      const testLine = currentLine + word + ' ';
      const metrics = this.context!.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && currentLine !== '') {
        // Start a new line
        this.drawTextLine(currentLine, x, currentY, size);
        currentLine = word + ' ';
        currentY += 20; // Adjust as needed based on font size and line height
      } else {
        currentLine = testLine;
      }
    }

    // Draw the last line
    this.drawTextLine(currentLine, x, currentY, size);
  }

  drawTextLine(text: string, x: number, y: number, size: number) {
    this.context!.font = `${size}px ${this.selectedFont}`;
    this.context?.fillText(text, x, y);
  }

  updateCanvas() {
    // Clear canvas
    this.context?.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    this.context?.drawImage(this.img, 10, 10, 150, 150);

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
  zoomToPoint(event: MouseEvent) {
    const canvas = this.canvas.nativeElement;
    const boundingRect = canvas.getBoundingClientRect();
    
    // Calculate the position of the click relative to the canvas
    const clickX = event.clientX - boundingRect.left;
    const clickY = event.clientY - boundingRect.top;
  
    // Calculate the new zoom factor
    const newZoomFactor = this.zoomFactor * 1.2;
  
    // Calculate the new position after zoom
    const newX = clickX - (clickX - canvas.width / 2) * (newZoomFactor / this.zoomFactor);
    const newY = clickY - (clickY - canvas.height / 2) * (newZoomFactor / this.zoomFactor);
  
    // Update the zoom factor and apply the zoom
    this.zoomFactor = newZoomFactor;
    this.applyZoom();
  
    // Set the new transformation origin
    canvas.style.transformOrigin = `${newX}px ${newY}px`;
  }
  
  handleDoubleTap(event: MouseEvent) {
    // Prevent default double-click behavior, which may interfere with the zoomToPoint
    event.preventDefault();
  
    // Check if the double click is on the canvas
    if (event.target === this.canvas.nativeElement) {
      this.zoomToPoint(event);
    }
  }
  limitZoom() {
    this.zoomFactor = Math.max(this.minZoomFactor, Math.min(this.maxZoomFactor, this.zoomFactor));
  }
  handleImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'image/svg+xml') {
        alert('Please select an SVG file.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.img.src = e.target.result;
        this.img.onload = () => {
          this.updateCanvas();
        };
      };
      reader.readAsDataURL(file);
    }
  }

}
