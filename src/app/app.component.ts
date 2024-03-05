import { Component } from '@angular/core';
import {fabric} from 'fabric';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'canvaManipulation';
  ngAfterViewInit() {
    this.canvaManipulation();
  }
  canvaManipulation() {
    var canvas = new fabric.Canvas('canvas');
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20
    });
    canvas.add(rect);
  }
}
