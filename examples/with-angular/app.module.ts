import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { routing } from './app.routing'
import { Sample1Component } from './components/sample1.component'
import { Sample2Component } from './components/sample2.component'

@NgModule({
  imports: [BrowserModule, routing],
  declarations: [AppComponent, Sample1Component, Sample2Component],
  bootstrap: [AppComponent]
})
export class AppModule {}
