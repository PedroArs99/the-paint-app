import { Injectable } from '@angular/core';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { ChannelService } from './channel.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class DrawingService {
  private stage?: Konva.Stage;
  private drawingLayer?: Konva.Layer;

  private isPainting = false;
  private currentPainting?: Konva.Line;

  constructor(private userService: UserService, private channelService: ChannelService) {}

  initStage(containerId: string, width: number, height: number) {
    this.stage = new Konva.Stage({
      container: containerId,
      width,
      height,
    });

    this.drawingLayer = new Konva.Layer();
    this.stage.add(this.drawingLayer);

    this.stage.on('mousedown touchstart', this.onPaintingStart.bind(this));
    this.stage.on('mousemove touchmove', (e) =>
      this.onPaintingPointerMove.bind(this)(e)
    );
    this.stage.on('mouseup touchend', this.onPaintingEnd.bind(this));
  }

  private onPaintingStart() {
    this.isPainting = true;

    let pointerPosition = this.stage?.getPointerPosition();
    if (!pointerPosition) return;

    this.currentPainting = new Konva.Line({
      stroke: '#3',
      strokeWidth: 5,
      globalCompositeOperation: 'source-over',
      // round cap for smoother lines
      lineCap: 'round',
      lineJoin: 'round',
      // add point twice, so we have some drawings even on a simple click
      points: [
        pointerPosition.x,
        pointerPosition.y,
        pointerPosition.x,
        pointerPosition.y,
      ],
    });

    this.drawingLayer?.add(this.currentPainting);

    this.channelService.publish({
      userId: this.userService.userId,
      type: 'start',
      pointerPosition,
    });
  }

  private onPaintingPointerMove(e: KonvaEventObject<any, Konva.Stage>) {
    if (!this.isPainting) return;

    // prevent scrolling on touch devices
    e.evt.preventDefault();

    let pointerPosition = this.stage?.getPointerPosition();
    if (!pointerPosition) return;

    var newPoints = this.currentPainting
      ?.points()
      .concat([pointerPosition.x, pointerPosition.y]);
    this.currentPainting?.points(newPoints ?? []);

    this.channelService.publish({
      userId: this.userService.userId,
      type: 'start',
      pointerPosition,
    });
  }

  private onPaintingEnd() {
    this.isPainting = false;

    this.channelService.publish({
      userId: this.userService.userId,
      type: 'end',
    });
  }
}
