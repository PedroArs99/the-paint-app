import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Konva from 'konva';
import { KonvaEventListener } from 'konva/lib/Node';
import { Stage } from 'konva/lib/Stage';

@Component({
  selector: 'app-drawing-canvas',
  imports: [],
  templateUrl: './drawing-canvas.component.html',
  styleUrl: './drawing-canvas.component.scss',
})
export class DrawingCanvasComponent implements AfterViewInit {
  @ViewChild('canvasContainer')
  canvasContainer?: ElementRef;

  ngAfterViewInit(): void {
    const width = this.canvasContainer?.nativeElement.clientWidth;
    const height = this.canvasContainer?.nativeElement.clientHeight;

    let stage = new Konva.Stage({
      container: 'canvas-container',
      width,
      height
    });

    let layer = new Konva.Layer();
    stage.add(layer);

    let isPainting = false;
    let lastLine: Konva.Line;

    stage.on('mousedown touchstart', function (e) {
      isPainting = true;
      
      let pos = stage.getPointerPosition();
      if (!pos) return;

      lastLine = new Konva.Line({
        stroke: '#df4b26',
        strokeWidth: 5,
        globalCompositeOperation: 'source-over',
        // round cap for smoother lines
        lineCap: 'round',
        lineJoin: 'round',
        // add point twice, so we have some drawings even on a simple click
        points: [pos.x, pos.y, pos.x, pos.y],
      });
      layer.add(lastLine);
    });

    stage.on('mouseup touchend', function () {
      isPainting = false;
    });

    stage.on('mousemove touchmove', function (e) {
      if (!isPainting) {
        return;
      }

      // prevent scrolling on touch devices
      e.evt.preventDefault();

      const pos = stage.getPointerPosition();
      if (!pos) return;

      var newPoints = lastLine.points().concat([pos.x, pos.y]);
      lastLine.points(newPoints);
    });
  }
}
