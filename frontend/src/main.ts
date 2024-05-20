import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


//TODO: prefixid
//TODO: css -> scss
//TODO: px -> rem
//TODO: initialize current height
//TODO: ära accessi otse window-t, ole kindel et on tegu brauseriga enne googleda isPlatformBrowser
//TODO: translations? 
