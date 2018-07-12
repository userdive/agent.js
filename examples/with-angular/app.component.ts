import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  Inject
} from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import userdive from 'userdive'
const _ud = userdive()

@Component({
  selector: 'app',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements AfterViewInit, AfterViewChecked {
  constructor (@Inject(Router) private router: Router) {}

  public ngAfterViewInit () {
    _ud('create', 'af57h6gb', 'auto')
  }

  public ngAfterViewChecked () {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        _ud('send', 'pageview', location.href)
      }
    })
  }
}
