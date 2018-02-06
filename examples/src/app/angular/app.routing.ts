import { ModuleWithProviders } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { Sample1Component } from './components/sample1.component'
import { Sample2Component } from './components/sample2.component'

const routes: Routes = [
  {
    path: 'sample1',
    component: Sample1Component
  },
  {
    path: 'sample2',
    component: Sample2Component
  },
  {
    path: '**',
    redirectTo: 'sample1'
  }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: true
})
