import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DrawingCanvasComponent } from './components/drawing-canvas/drawing-canvas.component';

const components = [
  DrawingCanvasComponent
]

@Component({
  selector: 'app-root',
  imports: [
    ...components,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'the-paint-app';
}
