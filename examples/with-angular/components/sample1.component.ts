import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  template: `
    <a routerLink="/sample2">Sample2</a>
  `,
  providers: [RouterModule]
})
export class Sample1Component {}
