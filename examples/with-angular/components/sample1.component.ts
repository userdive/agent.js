import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  providers: [RouterModule],
  template: `
    <a routerLink="/sample2">Sample2</a>
  `,
})
export class Sample1Component {}
