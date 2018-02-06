import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import 'reflect-metadata'
import 'zone.js/dist/zone'
import { AppModule } from './app.module'

const platform = platformBrowserDynamic()
platform.bootstrapModule(AppModule)
