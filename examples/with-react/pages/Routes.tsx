import * as React from 'react'
import { HashRouter, Redirect, Route } from 'react-router-dom'

import userdive from 'userdive'
import Sample1 from '../components/sample1'
import Sample2 from '../components/sample2'

type Props = {}

export default class App extends React.PureComponent<Props, void> {
  constructor (props: Props) {
    super(props)
    const _ud: Function = userdive()
    _ud('create', 'af57h6gb', 'auto')
  }
  render () {
    return (
      <HashRouter>
        <div>
          <Route path='/sample1' component={Sample1} />
          <Route path='/sample2' component={Sample2} />
          <Redirect from='/' to='/sample1' />
        </div>
      </HashRouter>
    )
  }
}
