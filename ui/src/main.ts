import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { Amplify, ResourcesConfig } from 'aws-amplify';
import config from '../amplify_outputs.json';

Amplify.configure(config as ResourcesConfig);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
