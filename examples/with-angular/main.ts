import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import 'reflect-metadata'
// tslint:disable-next-line:no-submodule-imports
import 'zone.js/dist/zone'
import { AppModule } from './app.module'

const platform = platformBrowserDynamic()
platform.bootstrapModule(AppModule)
