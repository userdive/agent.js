import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  template: `
    <a routerLink="/sample1">Sample1</a>
  `,
  providers: [RouterModule]
})
export class Sample2Component {}
