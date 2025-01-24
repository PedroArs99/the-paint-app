import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Konva from 'konva';
import { KonvaEventListener } from 'konva/lib/Node';
import { Stage } from 'konva/lib/Stage';
import { DrawingService } from '../../services/drawing.service';

@Component({
  selector: 'app-drawing-canvas',
  imports: [],
  templateUrl: './drawing-canvas.component.html',
  styleUrl: './drawing-canvas.component.scss',
})
export class DrawingCanvasComponent implements AfterViewInit {
  @ViewChild('canvasContainer')
  canvasContainer?: ElementRef;

  constructor(private drawingService: DrawingService) {}

  ngAfterViewInit(): void {
    const width = this.canvasContainer?.nativeElement.clientWidth;
    const height = this.canvasContainer?.nativeElement.clientHeight;

    this.drawingService.initStage('canvas-container', width, height);
  }
}
