import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { Sample1Component } from './components/sample1.component'
import { Sample2Component } from './components/sample2.component'

const routes: Routes = [
  {
    component: Sample1Component,
    path: 'sample1'
  },
  {
    component: Sample2Component,
    path: 'sample2'
  },
  {
    path: '**',
    redirectTo: 'sample1'
  }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
