import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  providers: [RouterModule],
  template: `
    <a routerLink="/sample1">Sample1</a>
  `,
})
export class Sample2Component {}
