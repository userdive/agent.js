import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { RoutingModule } from './app.routing'
import { Sample1Component } from './components/sample1.component'
import { Sample2Component } from './components/sample2.component'

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    Sample1Component,
    Sample2Component
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ]
})
export class AppModule {}
