import * as React from 'react'
import { HashRouter, Redirect, Route } from 'react-router-dom'
import factory from 'userdive'

import Sample1 from '../components/sample1'
import Sample2 from '../components/sample2'

export default class App extends React.PureComponent<{}> {
  constructor (props: {}) {
    super(props)
    const _ud = factory()
    _ud('create', 'af57h6gb', 'auto')
  }
  render () {
    return (
      <HashRouter>
        <React.Fragment>
          <Route path='/sample1' component={Sample1} />
          <Route path='/sample2' component={Sample2} />
          <Redirect from='/' to='/sample1' />
        </React.Fragment>
      </HashRouter>
    )
  }
}
