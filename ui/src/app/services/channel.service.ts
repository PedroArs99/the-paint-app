import { Injectable } from '@angular/core';
import { events } from 'aws-amplify/data';
import { DrawingEvent } from '../models/drawing-event';
import { Amplify } from 'aws-amplify';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private channelName = '/default/drawings';
  private apiKey = Amplify.getConfig().API?.Events?.apiKey;


  constructor() {
    events.connect(this.channelName).then((channel) => {
      channel.subscribe({
        next: (data) => {
          console.log('received', data);
        },
        error: (err) => console.error('error', err),
      });
    });
  }

  async publish<T extends DrawingEvent>(event: T) {
    await events.post(this.channelName, JSON.stringify(event), {
      authMode: 'apiKey',
      authToken: this.apiKey,
    });
  }
}
