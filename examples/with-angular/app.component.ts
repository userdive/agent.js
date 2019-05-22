import { Component, Inject } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import 'rxjs/add/operator/filter'
import userdive from 'userdive'

const _ud = userdive()

@Component({
  providers: [AppComponent],
  selector: 'app',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  // eslint-disable-next-line @typescript-eslint/no-parameter-properties
  public constructor(@Inject(Router) private router: Router) {
    this.router.events
      .filter(e => e instanceof NavigationEnd)
      .subscribe(() => {
        const w = window as any
        w._ud('send', 'pageview')
      })
  }

  public ngAfterViewInit() {
    _ud('create', 'af57h6gb', 'auto')
  }
}
