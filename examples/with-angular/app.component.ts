import { Component, Inject } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import userdive from 'userdive'
const _ud = userdive()

@Component({
  selector: 'app',
  template: `<router-outlet></router-outlet>`,
  providers: [AppComponent]
})
export class AppComponent {
  constructor (@Inject(Router) private router: Router) {}

  ngAfterViewInit () {
    _ud('create', 'af57h6gb', 'auto')
  }

  ngAfterViewChecked () {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        _ud('send', 'pageview', location.href)
      }
    })
  }
}
