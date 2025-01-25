export type DrawingEventType = 'start' | 'pointerMove' | 'end';

export interface Event {
  userId: string;
}

export interface DrawingEvent extends Event {
  type: DrawingEventType;
}

interface StartDrawingEvent extends DrawingEvent {
  type: 'start';
  pointerPosition?: {
    x: number;
    y: number;
  };
}

interface PointerMoveDrawingEvent extends DrawingEvent {
  type: 'pointerMove';
  pointerPosition?: {
    x: number;
    y: number;
  };
}

interface EndDrawingEvent extends DrawingEvent {
  type: 'end';
}