import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
// tslint:disable-next-line:no-submodule-imports
import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import { AppModule } from './app.module'

platformBrowserDynamic().bootstrapModule(AppModule)
